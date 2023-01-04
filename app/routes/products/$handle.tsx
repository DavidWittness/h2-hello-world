import {useLoaderData} from '@remix-run/react';
import type {LoaderArgs} from '@shopify/remix-oxygen';
import {json} from 'react-router';
import ProductOptions from '~/components/ProductOptions';
// import {Image} from '@shopify/hydrogen';

export const loader = async ({params, context, request}: LoaderArgs) => {
  const {handle} = params;
  const searchParams = new URL(request.url).searchParams;
  const selectedOptions = [];

  // set selected options by query string
  searchParams.forEach((value, name) => {
    selectedOptions.push({name, value});
  });

  const data = await context.storefront.query(PRODUCT_QUERY, {
    variables: {
      handle,
      selectedOptions,
    },
  });

  const {product} = data;

  /**
   * Likewise, we're defaulting to the first variant for purposes
   * of add to cart if there is none returned from the loader.
   * A developer can opt out of this, too.
   */
  const selectedVariant = product.selectedVariant ?? product.variants.nodes[0];

  return json({
    handle,
    product,
    selectedVariant,
  });
};

export default function ProductHandle() {
  const {handle, product, selectedVariant} = useLoaderData();
  return (
    <>
      <div className="product-wrapper">
        <div className="product-media">
          <img
            src={product.media.nodes[0].image.url}
            alt={product.media.nodes[0].image.altText || 'alt text'}
            className="product-image"
          />
        </div>
        <div className="product-details">
          <h2>{product.title}</h2>
          <p>{product.vendor}</p>
          <p dangerouslySetInnerHTML={{__html: product.descriptionHtml}} />
          <ProductOptions options={product.options} />
          <p>selected: {selectedVariant.title}</p>
        </div>
      </div>
      <details>
        <summary>Product JSON</summary>
        <pre>{JSON.stringify(product, null, 2)}</pre>
      </details>
    </>
  );
}

const PRODUCT_QUERY = `#graphql
  query product($handle: String!, $selectedOptions: [SelectedOptionInput!]!) {
    product(handle: $handle) {
      id
      title
      handle
      vendor
      descriptionHtml
      media(first: 10) {
        nodes {
          ... on MediaImage {
            mediaContentType
            image {
              id
              url
              altText
              width
              height
            }
          }
        }
      }
      options {
        name,
        values
      }
      selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
        id
        availableForSale
        selectedOptions {
          name
          value
        }
        image {
          id
          url
          altText
          width
          height
        }
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        sku
        title
        unitPrice {
          amount
          currencyCode
        }
        product {
          title
          handle
        }
      }
      variants(first: 1) {
        nodes {
          id
          title
          availableForSale
          price {
            currencyCode
            amount
          }
          compareAtPrice {
            currencyCode
            amount
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`;

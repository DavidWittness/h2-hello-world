import {Link, useLocation} from '@remix-run/react';

interface ProductOptionsProps {
  options: any[];
}

// No optimistic UI in this super simple example
export default function ProductOptions({options}: ProductOptionsProps) {
  const {pathname, search} = useLocation();

  return (
    <div className="product-options">
      {options.map((option) => {
        if (!option.values.length) {
          return;
        }
        return (
          <div key={option.name} className="product-option">
            <h3>{option.name}</h3>

            <div className="product-option-values">
              {option.values.map((value) => {
                const linkParams = new URLSearchParams(search);
                linkParams.set(option.name, value);
                return (
                  <Link
                    key={value}
                    to={`${pathname}?${linkParams.toString()}`}
                    className="product-option-value"
                  >
                    {value}
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

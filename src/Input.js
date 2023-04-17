import { useMemo } from "react";

const Input = (props) => {
  const margins = processMargins(props.margins);

  const formatted = useMemo(() => {
    const formatter = new Intl.NumberFormat("pt-BR", {
      currency: "BRL",
      minimumFractionDigits: 2,
    });
    return formatter.format(props.value || 0);
  }, [props.value]);

  const handleInput = (e) => {
    const value = e.target.value.replace(/[.,]/g, "");
    if (Number.isNaN(value)) return;
    if (Number(value) < 100000000000000) props.onChange(e);
  };

  return (
    <div className="currencyinput" style={{ ...margins }}>
      <label className="currencyinput__label" htmlFor={props.id}>
        {props.label}
      </label>
      <input
        className="currencyinput__input"
        type="text"
        inputMode="numeric"
        id={props.id}
        value={formatted}
        onChange={handleInput}
      />
      <span className="currencyinput__error">{props.error}&nbsp;</span>
    </div>
  );
};

function processMargins(margins) {
  if (margins) {
    const [marginTop, marginRight, marginBottom, marginLeft] = margins;
    return { marginTop, marginRight, marginBottom, marginLeft };
  }

  return { marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: 0 };
}

export default Input;
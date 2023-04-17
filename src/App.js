import React, { useMemo, useState } from "react";
import "./App.css";
import Input from "./Input";

const taxas = {
  1: 0.02449,
  2: 0.04308,
  3: 0.05076,
  4: 0.05877,
  5: 0.06656,
  6: 0.07447,
  7: 0.08308,
  8: 0.09099,
  9: 0.99020,
  10: 0.10718,
  11: 0.11533,
  12: 0.12348,
  13: 0.13160,
  14: 0.13987,
  15: 0.14824,
  16: 0.15661,
  17: 0.16495,
  18: 0.17330,
};

const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function App() {
  const [valorSimulado, setValorSimulado] = useState("");
  const [parcelas, setParcelas] = useState("");
  const [jurosSelecionado, setJurosSelecionado] = useState("");

  const result = useMemo(() => {
    if (isNaN(valorSimulado) || isNaN(parcelas)) return 0;

    let valorTotal = 0;
    if (jurosSelecionado === "cliente") {
      valorTotal = valorSimulado / (1 - taxas[parcelas]);
    }
    if (jurosSelecionado === "loja") {
      valorTotal = valorSimulado * (1 - taxas[parcelas]);
    }

    return valorTotal;
  }, [valorSimulado, parcelas, jurosSelecionado]);

  const passarMaquina =
    jurosSelecionado && jurosSelecionado === "loja" ? valorSimulado : result;

  const disponivelLoja =
    jurosSelecionado && jurosSelecionado === "loja" ? result : valorSimulado;

  return (
    <div className="container">
      <h1>Simulador de Parcelas</h1>
      <form className="form">
        <label className="form__label" for="juros">Quem Assume a Taxa:</label>
        <select
          className="form__input"
          id="juros"
          name="juros"
          value={jurosSelecionado}
          onChange={(e) => setJurosSelecionado(e.target.value)}
          required
        >
          <option value="">Selecione</option>
          <option value="loja">Loja</option>
          <option value="cliente">Cliente</option>
        </select>
        <label className="form__label" for="parcelas">Número de Parcelas</label>
        <select
          id="parcelas"
          className="form__input"
          name="parcelas"
          value={parcelas}
          onChange={(e) => setParcelas(e.target.value)}
          required
        >
          <option value="">Selecione</option>
          <option value="1">1x Sem Juros</option>
          <option value="2">2x</option>
          <option value="3">3x</option>
          <option value="4">4x</option>
          <option value="5">5x</option>
          <option value="6">6x</option>
          <option value="7">7x</option>
          <option value="8">8x</option>
          <option value="9">9x</option>
          <option value="10">10x</option>
          <option value="11">11x</option>
          <option value="12">12x</option>
          <option value="13">13x</option>
          <option value="14">14x</option>
          <option value="15">15x</option>
          <option value="16">16x</option>
          <option value="17">17x</option>
          <option value="18">18x</option>
        </select>

        {/* <label>Taxa de Juros:</label>
        <div>{`${parcelas && taxas[parcelas] * 100} %`}</div> */}

        <label htmlFor="valor">Valor Simulado</label>
        <Input
          value={valorSimulado}
          onChange={(e) => {
            setValorSimulado(Number(e.target.value.replace(/[.,]/g, "")) / 100);
          }}
        />

        <div id="resultado">
          <div for="valor-total">
            <div className="valores">
              <div>Passar na máquina</div>
              <div>{formatter.format(passarMaquina)}</div>
            </div>
          </div>
        </div>
        <div id="resultado">
          <div for="valor-total">
            <div className="valores">
              <div>Disponível na loja</div>
              <div>{formatter.format(disponivelLoja)}</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;

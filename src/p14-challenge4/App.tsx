import { useState, useEffect } from "react";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("EUR");
  const [to, setTo] = useState("USD");
  const [output, setOutput] = useState<number>(0);
  const [isLoading, setIsloading] = useState(false);

  useEffect(
    function () {
      async function convertCurrency() {
        try {
          setIsloading(true);
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
          );
          const result = await res.json();

          setOutput(result.rates[to]);
        } catch (err) {
          console.log(err);
        } finally {
          setIsloading(false);
        }
      }

      if (from === to) {
        setOutput(1);
        return;
      }

      convertCurrency();
    },
    [amount, from, to]
  );
  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.valueAsNumber)}
        disabled={isLoading}
      />
      <select
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={to}
        onChange={(e) => setTo(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>

      <p>
        {output} {to}
      </p>
    </div>
  );
}

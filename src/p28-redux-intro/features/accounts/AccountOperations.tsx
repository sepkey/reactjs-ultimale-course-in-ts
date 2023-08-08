import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, payLoan, requestLoan, withdraw } from "./accountsSlice";
import { RootState } from "../../type";

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState<number>();
  const [withdrawalAmount, setWithdrawalAmount] = useState<
    number | undefined
  >();
  const [loanAmount, setLoanAmount] = useState<number>();
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("USD");

  const dispatch = useDispatch();
  const {
    balance,
    loan: currentLoan,
    loanPurposes: currentPurpose,
  } = useSelector((store: RootState) => store.account);
  console.log(balance);

  function handleDeposit() {
    if (!depositAmount) return;
    dispatch(deposit(depositAmount!));
    setDepositAmount(undefined);
  }

  function handleWithdrawal() {
    if (!withdrawalAmount) return;
    dispatch(withdraw(withdrawalAmount!));
    setWithdrawalAmount(undefined);
  }

  function handleRequestLoan() {
    if (!loanAmount || !loanPurpose) return;
    dispatch(requestLoan(loanAmount!, loanPurpose));
    setLoanPurpose("");
    setLoanAmount(undefined);
  }

  function handlePayLoan() {
    dispatch(payLoan());
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount || ""}
            onChange={(e) => setDepositAmount(e.target.valueAsNumber)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>

          <button onClick={handleDeposit}>Deposit {depositAmount}</button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount || ""}
            onChange={(e) => setWithdrawalAmount(e.target.valueAsNumber)}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.valueAsNumber)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>

        {currentLoan > 0 && (
          <div>
            <span>Pay back ${currentLoan}</span>
            <button onClick={handlePayLoan}>Pay loan</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountOperations;

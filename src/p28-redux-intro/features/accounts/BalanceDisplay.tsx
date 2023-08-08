import { connect } from "react-redux";
import { RootState } from "../../type";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay({ balance }: { balance: number }) {
  return <div className="balance">{formatCurrency(balance)}</div>;
}
function mapStateToProps(state: RootState) {
  return {
    balance: state.account.balance,
  };
}
export default connect(mapStateToProps)(BalanceDisplay);

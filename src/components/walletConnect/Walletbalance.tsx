import { useBalance, useAccount } from "wagmi";

const WalletBalance = () => {
  const { address, isConnected } = useAccount();

  const { data } = useBalance({
    address,
    // watch: true, // auto-update on change
  });

  if (!isConnected) return null;

  return (
    <span style={{ 
      marginLeft: "12px",
      fontWeight: "600",
      fontSize: "16px",
      color: "#4caf50"
    }}>
      {data ? `${parseFloat(data.formatted).toFixed(4)} ${data.symbol}` : ""}
    </span>
  );
};

export default WalletBalance;

import ReconnectingWebSocket from "reconnecting-websocket";

export async function getBitcoinPrice() {
  const response = await fetch(
    `https://api.geckoterminal.com/api/v2/simple/networks/glmr/token_price/0x6021d2c27b6fbd6e7608d1f39b41398caee2f824`
  )
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return Number(data.data.attributes.token_prices[
    "0x6021d2c27b6fbd6e7608d1f39b41398caee2f824"
  ])
}

export function initWebSocket(onMessage: (data: any) => void) {
  const coinbaseWebSocket = new ReconnectingWebSocket(
    "wss://ws-feed.pro.coinbase.com"
  );

  coinbaseWebSocket.onopen = () => {
    coinbaseWebSocket.send(
      JSON.stringify({
        type: "subscribe",
        channels: [{ name: "ticker", product_ids: ["BTC-USD"] }],
      })
    );
  };

  coinbaseWebSocket.onmessage = (message) => {
    const data = JSON.parse(message.data);
    onMessage(data);
  };

  return coinbaseWebSocket;
}

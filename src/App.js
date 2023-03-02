import react,{useState} from 'react';
import './App.css';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import algosdk from "algosdk";
// import { Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const myAlgoConnect = new MyAlgoConnect();
const algodClient = new algosdk.Algodv2("",'	https://testnet-api.algonode.cloud', '');
const indexClient = new algosdk.Indexer('', 'https://testnet-idx.algonode.cloud', '');
function App() {
  const [currentAccount, setCurrentAccount] = useState();
  const [connector, setConnector] = useState();







  
  const connect=async()=>
  {

    console.log('hiiii')
    const settings = {
      
      shouldSelectOneAccount: false,
      openManager: false
  };
  const accounts = await myAlgoConnect.connect(settings);
  const addresses = accounts.map((account) => account.address);
  console.log(addresses[0]);
  localStorage.setItem("address",addresses[0]);//connected address stored as a cookie
  toast.success('Connected successfully', {position: "bottom-right",autoClose: 5000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,theme: "light",});
  }
  const disconnect=async()=>
  {
    
  localStorage.removeItem("address");//connected address stored as a cookie
  toast.success('Disconnected successfully', {position: "bottom-right",autoClose: 5000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,theme: "colored",});
  
  }
  const transact=async()=>
  {
    
    
    let sender = localStorage.getItem("address");
    let receiver=document.getElementById("ID").value;
    let amount = parseInt(document.getElementById("firstnumber").value);
    amount=amount*1000000
const algodClient = new algosdk.Algodv2("",'https://node.testnet.algoexplorerapi.io', '');
const params = await algodClient.getTransactionParams().do();

const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    suggestedParams: {
        ...params,
    },
    from: sender,
    to: receiver, 
    amount: amount,
    
});
const myAlgoConnect = new MyAlgoConnect();
const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
const response = await algodClient.sendRawTransaction(signedTxn.blob).do();//blob-in format of unit-8 array
console.log("https://testnet.algoexplorer.io/tx/"+response.txId);
toast.success('Transaction completed successfully', {position: "bottom-right",autoClose: 5000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,theme: "dark",});
  }

  return (
    <div className="App">
      <ToastContainer />
      <button onClick={connect}>New connect</button>
      <button onClick={transact}>Transaction</button>
      <p>amount: <input id="firstnumber"></input></p>
      <p>account: <input id="ID"></input></p>
      {/* <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      /> */}
      <button onClick={disconnect}>Disconnect</button>
    </div>
  
  );
  }

export default App;


var web3 = new Web3("https://polygon-mumbai.g.alchemy.com/v2/eSxuRikK4ljXZuw6RnDygasQYmyumx7R");

const Private_key = "0x63e5920fa72ee2e06de0d3b9ec90cb194ea634b1fa87c9dd3842bf0ed52a6788";
const to_address = "0xC7d9BbB930791d5EA114f7589D7FF82946134F8a";
 

async function eth_transaction(){
    const Private_key = document.getElementById("fromPK").value;
    const to_address = document.getElementById("toaddress").value;

    var value = web3.utils.toWei(document.getElementById("amount").value.toString(),'ether');
    

    var SignedTransaction = await web3.eth.accounts.signTransaction({
        to: to_address,
        value: value,
        gasLimit:'0xC350',
		gas:'21000'

    }, Private_key);
    
    web3.eth.sendSignedTransaction(SignedTransaction.rawTransaction).then(
        (receipt)=>{
                console.log(receipt.transactionHash);
                document.getElementById("details").value ="Hash: " + receipt.transactionHash;
        });
        
}


var totalAddresses = 0;

function generate_seed()//creates new seed
{
    var new_seed = lightwallet.keystore.generateRandomSeed();

    console.log(new_seed);

	document.getElementById("Info1").value = new_seed;

	generate_addresses(new_seed);//sending the 12 word to make them private key
}

function generate_addresses(seed)//creating addresses by the seed (12 words )
{
	if(seed == undefined)//if there is no seed 
	{
		seed = document.getElementById("Info1").value;//taking the value from the textbox
	}

	if(!lightwallet.keystore.isSeedValid(seed))//if the seed is not legal or incorrect
	{
		document.getElementById("Info1").value = "Please enter a valid seed";
		return;
	}

	totalAddresses = prompt("How many addresses do you want to generate");

	
	if(!Number.isInteger(parseInt(totalAddresses)))
	{
		document.getElementById("details").placeholder = "Please enter valid number of addresses";
		console.log(err);
		return;
	}

	var password = Math.random().toString();//creating random password

	lightwallet.keystore.createVault({
		password: password,
	  	seedPhrase: seed
	}, function (err, ks) {
	  	ks.keyFromPassword(password, function (err, pwDerivedKey) {
	    	if(err)
	    	{
	    		document.getElementById("details").placeholder = err;
				console.log(err);
	    	}
	    	else
	    	{
	    		ks.generateNewAddress(pwDerivedKey, totalAddresses);
	    		var addresses = ks.getAddresses();//getting the adresses in array from the keystore	
					
	    		var web3 = new Web3(new Web3.providers.HttpProvider('https://polygon-mumbai.g.alchemy.com/v2/eSxuRikK4ljXZuw6RnDygasQYmyumx7R'));
	    		var html = "";

	    		for(var count = 0; count < addresses.length; count++)//for each adress in the addresses
	    		{
					var address = addresses[count];//getting the addresses 
					var private_key = ks.exportPrivateKey(address, pwDerivedKey);//returns private key of the address

					html = html + "<li>";//showing the information on the screen about address its private key and its balance
					html = html + "<p><b>Address: </b>0x" + address + "</p>";
					html = html + "<p><b>Private Key: </b>0x" + private_key + "</p>";//its private 
		    		html = html + "</li>";
	    		}

	    		document.getElementById("list").innerHTML = html;//all of this inside a list 
	    	}
	  	});
	});
}



function check_balance(){

	const web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/eSxuRikK4ljXZuw6RnDygasQYmyumx7R"))
	
	var AddressTobalance = prompt("Enter your address to check you're balance");

	web3.eth.getBalance(AddressTobalance, function(err, result) {
	  if (err) {
		console.log(err)
	  } else {
		console.log(web3.utils.fromWei(result, "ether") + " MATIC")
		document.getElementById("details").value ="Account Balance "+ web3.utils.fromWei(result, "ether") + " MATIC";
	  }
	})

}
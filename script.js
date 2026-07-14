let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let editId = null;
updateUI();
function addTransaction(){
    let text=document.getElementById("text").value;
    let amount=Number(document.getElementById("amount").value);
    let type=document.getElementById("type").value;
    if(text==="" || amount<=0){
        alert("Please enter details");
        return;
    }
    if(editId===null){
        let transaction={
            id:Date.now(),
            text:text,
            amount:amount,
            type:type

        };
        transactions.push(transaction);
    }
    else{
        transactions=transactions.map(function(transaction){
            if(transaction.id===editId){
                return{
                    id:editId,
                    text:text,
                    amount:amount,
                    type:type
                };
            }
            return transaction;
        });
        editId=null;
    }
        saveData();

    updateUI();
    document.getElementById("text").value="";
    document.getElementById("amount").value="";


}
function updateUI(){


    let list=document.getElementById("list");

    list.innerHTML="";
    let income=0;
    let expense=0;
    transactions.forEach(function(transaction){
        let li=document.createElement("li");
        li.innerHTML=`
        ${transaction.text} : ₹${transaction.amount}

        <button onclick="editTransaction(${transaction.id})">
        Edit
        </button>

        <button onclick="deleteTransaction(${transaction.id})">
        Delete
        </button>

        `;
        list.appendChild(li);
        if(transaction.type==="income"){
            income+=transaction.amount;

        }
        else{
            expense+=transaction.amount;
        }
    });
    document.getElementById("income").innerText="₹"+income;
    document.getElementById("expense").innerText="₹"+expense;
    document.getElementById("balance").innerText="₹"+(income-expense);
}
function deleteTransaction(id){
    transactions=transactions.filter(function(transaction){
        return transaction.id!==id;
    });
    saveData();
    updateUI();

}
function editTransaction(id){
    let transaction=transactions.find(function(transaction){
                return transaction.id===id;

    });
    document.getElementById("text").value=transaction.text;
    document.getElementById("amount").value=transaction.amount;
    document.getElementById("type").value=transaction.type;
    editId=id;
}
function saveData(){

    localStorage.setItem("transactions",JSON.stringify(transactions));

}
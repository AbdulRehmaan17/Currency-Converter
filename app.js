
class currencyConverter{
    constructor(){
        this.apiCurrency = "https://api.frankfurter.dev/v1/currencies";
        this.apiConvert = "https://api.frankfurter.dev/v1/latest";

        this.input1 = document.getElementById("amount1");
        this.input2 = document.getElementById("amount2");
        this.dropDown1 = document.getElementById("dropDown1");
        this.dropDown2 = document.getElementById("dropDown2");
        this.convertButton = document.getElementById("convertButton");
        this.convertButton.addEventListener("click", () => this.convertCurrency());

        this.getCurrency();
    }
    async getCurrency(){
        try{
            let response = await fetch(this.apiCurrency);
            let data = await response.json();

            for(let currency in data){
                let option1 = document.createElement("option");
                option1.value = currency;
                option1.text = currency;
                this.dropDown1.appendChild(option1);
                let option2 = document.createElement("option");
                option2.value = currency;
                option2.text = currency;
                this.dropDown2.appendChild(option2);
            }
        }
         catch(error){
            alert("Error fetching currency data: " + error);
        }

    }
    async convertCurrency(){
        let amount1 = this.input1.value;
        let from = this.dropDown1.value;
        let to = this.dropDown2.value;

        if(from === to){
            this.input2.value = amount1;
            return;
        }
        try{
            let url = this.apiConvert + "?amount=" + amount1 + "&from=" + from + "&to=" + to;
            let response = await fetch(url);
            let data = await response.json();
            this.input2.value = data.rates[to];
        }
        catch(error){
            alert("Error converting currency: " + error);
        }
    }
}
new currencyConverter();
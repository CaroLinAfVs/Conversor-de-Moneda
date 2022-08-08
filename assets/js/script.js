//variables global
const convert = document.querySelector("#convert");
let myChart;

//function to convert 
convert.addEventListener("click", () => {
    const amount = document.querySelector("#amount").value;
    const coin = document.querySelector("#coin").value;
    if (!amount) {
        alert("Ingresa un monto");
    }
    if (!coin) {
        alert("ingresa una moneda para cambiar")
    }
    getData(amount, coin)
});

//calling the api
async function getData(amount, coin) {
  try{
    //money
    const res = await fetch(`https://mindicador.cl/api/${coin}`)
    const resultado = await res.json()
    const serie = resultado.serie
    
    const total = amount / resultado.serie[0].valor
    document.querySelector("#moneyChange").innerHTML = Math.round(total * 100) / 100;

    // graphic
    const labels = serie.map((item) => new Date(item.fecha).toLocaleDateString("en-US"));
    const values = serie.map((item) => item.valor);

    const datasets = [{
        label: "Moneda",
        borderColor: "rgb(255, 99, 132)",
        data: values
    }]

    const config = {
        type: "line",
        data: {labels, datasets}
    };

    if (myChart) {
        myChart.destroy();
    }

    const chart = document.getElementById("myChart");
    chart.style.backgroundColor = "white";
    myChart = new Chart(chart, config);
  } 
  catch(error){
    alert(error.message)
  }
}

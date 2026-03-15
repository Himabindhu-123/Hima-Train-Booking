const trains = [
  { name:"Godavari Express", from:"Visakhapatnam", to:"Vijayawada", price:350, seats:40 },
  { name:"Simhadri Express", from:"Visakhapatnam", to:"Guntur", price:300, seats:35 },
  { name:"Coastal Express", from:"Visakhapatnam", to:"Nellore", price:420, seats:30 },
  { name:"Krishna Express", from:"Vijayawada", to:"Tirupati", price:380, seats:40 },
  { name:"Rayalaseema Express", from:"Kurnool", to:"Tirupati", price:400, seats:25 },
  { name:"Nellore Passenger", from:"Nellore", to:"Vijayawada", price:250, seats:50 },
  { name:"Guntur Intercity", from:"Guntur", to:"Visakhapatnam", price:340, seats:35 },
  { name:"Tirupati Superfast", from:"Tirupati", to:"Visakhapatnam", price:450, seats:28 }
];

// Populate AVAILABLE TRAINS table
window.onload = function() {
  const tbody = document.querySelector("#trainTable tbody");
  trains.forEach(train => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${train.name}</td>
      <td>${train.from}</td>
      <td>${train.to}</td>
      <td>${train.price}</td>
      <td>${train.seats}</td>
    `;
    tbody.appendChild(row);
  });
};

function searchTrains() {
  const name = document.getElementById("passengerName").value.trim();
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const date = document.getElementById("date").value;
  const passengers = parseInt(document.getElementById("passengers").value,10);
  const resultDiv = document.getElementById("trainResults");
  resultDiv.innerHTML = "";

  if(!name){ alert("Enter passenger name"); return; }
  if(from===to){ alert("Start and destination cannot be same"); return; }
  if(!date){ alert("Select a journey date"); return; }
  if(isNaN(passengers)||passengers<1){ alert("Passengers must be at least 1"); return; }

  const available = trains.filter(t => t.from===from && t.to===to);
  if(available.length===0){ resultDiv.innerHTML="<p>No trains available for this route.</p>"; return; }

  available.forEach(train => {
    const total = train.price*passengers;
    let seatNumbers=[];
    for(let i=0;i<passengers;i++){
      seatNumbers.push(Math.floor(Math.random()*train.seats)+1);
    }
    const card=document.createElement("div");
    card.className="train-card";
    card.innerHTML=`
      <h3>${train.name}</h3>
      <p><strong>${train.from}</strong> → <strong>${train.to}</strong></p>
      <p>Seats Available: ${train.seats}</p>
      <p>Seat Numbers: ${seatNumbers.join(", ")}</p>
      <p>Price per Ticket: ₹${train.price}</p>
      <p><strong>Total Price: ₹${total}</strong></p>
      <button class="book-btn" onclick="downloadReceipt(
        '${train.name}','${name}','${from}','${to}','${date}','${seatNumbers.join(",")}',${passengers},${total}
      )">Download Ticket</button>
    `;
    resultDiv.appendChild(card);
  });
}

function downloadReceipt(train,name,from,to,date,seats,passengers,price){
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();
  let y=20;
  pdf.setFontSize(20);
  pdf.setTextColor(11,110,253);
  pdf.text("HIMA RAIL-CONNECT Ticket",20,y);
  y+=10; pdf.setDrawColor(11,110,253);
  pdf.line(20,y,190,y); y+=15;
  pdf.setFontSize(12); pdf.setTextColor(0,0,0);
  pdf.text(`Passenger Name : ${name}`,20,y); y+=10;
  pdf.text(`Train Name : ${train}`,20,y); y+=10;
  pdf.text(`From : ${from}`,20,y); y+=10;
  pdf.text(`To : ${to}`,20,y); y+=10;
  pdf.text(`Journey Date : ${date}`,20,y); y+=10;
  pdf.text(`Passengers : ${passengers}`,20,y); y+=10;
  pdf.text(`Seat Numbers : ${seats}`,20,y); y+=10;
  pdf.text(`Total Price : Rs. ${Number(price)}`,20,y); y+=15;
  pdf.setTextColor(40,167,69);
  pdf.text("Thank you for booking with HIMA RAIL-CONNECT! ",20,y);
  pdf.save("HIMA_RAIL_CONNECT_Ticket.pdf");
}
// the primary data structure used is a 2D array (seats)
//  to represent the layout of seats in rows and columns. 
// Additionally, the code uses variables to store numeric values 
// (such as avl, booked, total, row, and col) for managing seat 
// availability and tracking the current position during the booking process.


// Total, available, and booked seat variables
var avl=80;
var booked=0;
var total=80;

// Current row and column indices
var row=0;
var col=0;

// 2D array representing seat layout
const seats=[[1,2,3,4,5,6,7],
[8,9,10,11,12,13,14],
[15,16,17,18,19,20,21],
[22,23,24,25,26,27,28],
[29,30,31,32,33,34,35],
[36,37,38,39,40,41,42],
[43,44,45,46,47,48,49],
[50,51,52,53,54,55,56],
[57,58,59,60,61,62,63],
[64,65,66,67,68,69,70],
[71,72,73,74,75,76,77],
[78,79,80]];

// DOM elements for displaying seat information
const Total_ticket=document.getElementById("total");
const avl_ticket=document.getElementById("avl");
const booked_ticket=document.getElementById("booked");
var selectbox=document.getElementById("tiket_quan");

// Initial display of seat layout
Total_ticket.innerText=total;
avl_ticket.innerText=avl;
booked_ticket.innerText=booked;

// Function to display seats in the HTML
const show_seats=document.getElementById("show_seats");
const display_seats=()=>{
    show_seats.innerText="";
    
    
    for(let i=0;i<12;i++){
        let len=7;
        if(i==11) len=3;
        for(let j=0;j<len;j++){
            show_seats.innerHTML+=`<div class='box' id='${seats[i][j]}'>${seats[i][j]}</div>`;
            if(seats[i][j]<10){
                document.getElementById(`${seats[i][j]}`).innerHTML=`0${seats[i][j]}`;
            } 
        }   
    }

}

// Initial display of seats
display_seats();

// Function to handle the logic of seat booking
const booking_logic=()=>{
    let seat_num=[];
    let bookings=selectbox.value;

    // Check if there are enough seats available
    if(bookings>avl){
        if(avl>0){
            document.getElementById("output").innerHTML="<div><h2>Sorry! Not enough seats available.</h2></div>";
            document.getElementById("output").innerHTML+=`<div><h3>Only ${avl} seats left!</h3></div>`;  
        }else{
            document.getElementById("output").innerHTML="<div><h2>Sorry! Seats are full.</h2></div>";
        }
        
        return;
    }

    // Update booked and available seat counts
    booked+=parseInt(bookings);
    avl-=parseInt(bookings);
    Total_ticket.innerText=total;
    avl_ticket.innerText=avl;
    booked_ticket.innerText=booked;

    // Logic for booking seats
    for(;((row<12) && (bookings>0));row++){
        
        if(row%2==0){
            if(col<=0) col=0;
            
            for(;(col<7 && bookings>0);col++){  
                seat_num.push(seats[row][col]);
                document.getElementById(`${seats[row][col]}`).style.backgroundColor="red";
                bookings--;
            }
        }else{
            if(col>=7) col=6;
            if((row==11) && col>=2) col=2;
            console.log(col);
            console.log(bookings);
            for(;((col>=0) && (bookings>0));col--){ 
                seat_num.push(seats[row][col]);
                document.getElementById(`${seats[row][col]}`).style.backgroundColor="red";
                bookings--;
            }
        }
        
        if(bookings==0){
            if((col==7) || (col==-1)) row++;
            break;
        }
    }

    // Display booking success message and seat numbers
    document.getElementById("output").innerHTML=`<div><h3>Seats booked sussessfully.</h3></div>`;
    document.getElementById("output").innerHTML+=`<div><h3>The seats number are:</h3></div>`;
    document.getElementById("output").innerHTML+=`<div><h3>${seat_num}</h3></div>`;
}

// Function called on button click to initiate seat booking
const book_ticket=()=>{
    // Call the booking_logic function
    booking_logic();
}
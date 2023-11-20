var avl=80;
    var booked=0;
    var total=80;

    var row=0;
    var col=0;


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
    const Total_ticket=document.getElementById("total");
    const avl_ticket=document.getElementById("avl");
    const booked_ticket=document.getElementById("booked");
    var selectbox=document.getElementById("tiket_quan");

    Total_ticket.innerText=total;
    avl_ticket.innerText=avl;
    booked_ticket.innerText=booked;
    
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
    display_seats();
    const booking_logic=()=>{
        let seat_num=[];
        let bookings=selectbox.value;
        if(bookings>avl){
            document.getElementById("output").innerHTML="<div><h2>Sorry! Not enough seats available.</h2></div>";
            document.getElementById("output").innerHTML+=`<div><h3>Only ${avl} seats left!</h3></div>`;
            return;
        }
        booked+=parseInt(bookings);
        avl-=parseInt(bookings);
        Total_ticket.innerText=total;
        avl_ticket.innerText=avl;
        booked_ticket.innerText=booked;

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

        document.getElementById("output").innerHTML=`<div><h3>Seats booked sussessfully.</h3></div>`;
        document.getElementById("output").innerHTML+=`<div><h3>The seats number are:</h3></div>`;
        document.getElementById("output").innerHTML+=`<div><h3>${seat_num}</h3></div>`;
    }
    const book_ticket=()=>{
        booking_logic();
    }
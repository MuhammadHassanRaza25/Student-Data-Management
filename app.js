var dataiconDiv = document.getElementById('dataiconDiv')
var form = document.getElementById('form')
var tbody = document.getElementById('tbody')
var nameInput = document.getElementById('nameInput')
var fnameInput = document.getElementById('fnameInput')
var emailInput = document.getElementById('emailInput')
var ageInput = document.getElementById('ageInput')
var selectCourse = document.getElementById('selectCourse')
var submitBtn = document.getElementById('submitBtn')


var studentData = []
submitBtn.addEventListener('click',()=>{
    // no data icon
    dataiconDiv.style.display = 'none'

    // Generating Roll Number Start
    var rollNum = Math.floor(Math.random()*10000)
    if(rollNum < 1000){
        rollNum = '00'+rollNum
    }
    console.log(rollNum);
    // Generating Roll Number End
    
    // Put Data in Array then Array To localStorage Start
    if(nameInput.value && fnameInput.value && emailInput.value && ageInput.value && selectCourse.value != ''){
        var studentdataObj = {
        serialNum: studentData.length + 1, // har new entry pe counting hogi agar +1 nahi lagate to 0 se counting hoti.
        rollNumber: rollNum,
        name: nameInput.value, 
        fatherName: fnameInput.value,
        email: emailInput.value,
        age: ageInput.value,
        course: selectCourse.value,
    } 
    
    studentData.push(studentdataObj)
    localStorage.setItem('studentsData', JSON.stringify(studentData))
    Swal.fire({
        title:'Good Job!',
        text: "Student Data has been Submitted Successfully",
        icon: "success"
      });
    form.reset()
    }
    else{
        Swal.fire({
            title: "Please fill these input fields then submit",
            icon: "info"
          });
    }
    // Put Data in Array then Array To localStorage End

    // Show data in table Start
     tbody.innerHTML += `
       <tr>
            <td>${studentdataObj.serialNum}</td>
            <td>${studentdataObj.rollNumber}</td>
            <td>${studentdataObj.name}</th>
            <td>${studentdataObj.fatherName}</td>
            <td>${studentdataObj.email}</th>
            <td>${studentdataObj.age}</td>
            <td>${studentdataObj.course}</td>
            <td><button id="delbtn">Delete</button></td>
          </tr>
     `
    // Show data in table End

    showData()
})

// data after refresh bhi rahega
var showData = ()=>{
	var getData = JSON.parse(localStorage.getItem('studentsData')) ?? [];
	var readyData = "";
	getData.forEach((element, i) => {
        dataiconDiv.style.display = 'none'
		readyData += `
			<tr>
				<td>${element.serialNum}</td>
                <td>${element.rollNumber}</td>
				<td>${element.name}</td>
				<td>${element.fatherName}</td>
				<td>${element.email}</td>
				<td>${element.age}</td>
                <td>${element.course}</td>
				<td><button id="delbtn" onclick="removeItem(${i})">Delete</button></td>
				</tr>
		`;
	});
	tbody.innerHTML = readyData;
}

// Remove Item
var removeItem = (index) => {
    dataiconDiv.style.display = 'block'
	var getData = JSON.parse(localStorage.getItem("studentsData")) ?? [];
	getData.splice(index, 1);

	localStorage.setItem("studentsData", JSON.stringify(getData));
	showData();
};
showData()
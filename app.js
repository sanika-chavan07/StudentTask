const cl = console.log;
const stdContainer = document.getElementById('stdContainer') 
const stdForm = document.getElementById('stdForm') 
const fnameControl = document.getElementById('fname') 
const lnameControl = document.getElementById('lname') 
const emailControl = document.getElementById('email') 
const contactControl = document.getElementById('contact') 

const submitBtn = stdForm.querySelector('button[type="submit"]')
const updateBtn = stdForm.querySelector('button[type="button"]')

let editId = null

let stdArr = [
    {
        fname: 'Jhon',
        lname: 'Doe',
        email: 'jdoe@gmail.com',
        contact: '1234567890',
        stdId: '6edf782c-2b0d-4fc8-b013-5468a45891fb'
    },
    {
        fname: 'May',
        lname: 'Doe',
        email: 'may@gmail.com',
        contact: '7895642310',
        stdId: '678978798c-2b0d-4fc8-b013-5468a45891fb'
    },
    {
        fname: 'June',
        lname: 'Doe',
        email: 'jun@gmail.com',
        contact: '9876543210',
        stdId: 'ee08e859-7c9e-40dd-9b92-2b698dbf9db7'
    }
]


// UUID
const uuid = () => {
    return String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx').replace(/[xy]/g, character => {
        const random = (Math.random() * 16) | 0
        const value = character === 'x' ? random : (random & 0x3) | 0x8
        return value.toString(16)
    })
}


// 🔔 Center snackbar (same for add/update/delete)
function snackbar(msg, icon='success'){
    Swal.fire({
        title: msg,
        icon: icon,
        timer: 2000,
        showConfirmButton: false
    })
}


// Render table
function createStdTrs(arr) {
    let result = ''
    arr.forEach((ele, i) => {
        result += `
        <tr id="${ele.stdId}">
            <td>${i + 1}</td>
            <td>${ele.fname} ${ele.lname}</td>
            <td>${ele.email}</td>
            <td>${ele.contact}</td>

            <td class="text-center">
                <i data-id="${ele.stdId}" role="button"
                class="editBtn fa-solid fa-pen-to-square fa-2x text-success"></i>
            </td>

            <td class="text-center">
                <i data-id="${ele.stdId}" role="button"
                class="removeBtn fa-solid fa-trash-can fa-2x text-danger"></i>
            </td>
        </tr>`
    })

    stdContainer.innerHTML = result
}

createStdTrs(stdArr)


// ADD
function onStdAdd(eve){
    eve.preventDefault()

    let stdObj = {
        fname: fnameControl.value,
        lname: lnameControl.value,
        email: emailControl.value,
        contact: contactControl.value,
        stdId: uuid()
    }

    stdArr.push(stdObj)
    createStdTrs(stdArr)
    stdForm.reset()

    snackbar(`New student added`)
}


// EDIT + DELETE click
function onTableClick(e){

    // DELETE
    if(e.target.classList.contains('removeBtn')){
        const id = e.target.dataset.id

        Swal.fire({
            title:'Are you sure?',
            text:'You want to delete this student',
            icon:'warning',
            showCancelButton:true,
            confirmButtonText:'Yes delete'
        }).then(res=>{
            if(res.isConfirmed){
                stdArr = stdArr.filter(std => std.stdId !== id)
                createStdTrs(stdArr)
                snackbar('Student deleted','success')
            }
        })
    }

    // EDIT
    if(e.target.classList.contains('editBtn')){
        const id = e.target.dataset.id
        editId = id

        const std = stdArr.find(s => s.stdId === id)

        fnameControl.value = std.fname
        lnameControl.value = std.lname
        emailControl.value = std.email
        contactControl.value = std.contact

        submitBtn.classList.add('d-none')
        updateBtn.classList.remove('d-none')
    }
}


// UPDATE
function onStdUpdate(){
    let updatedObj = {
        fname: fnameControl.value,
        lname: lnameControl.value,
        email: emailControl.value,
        contact: contactControl.value,
        stdId: editId
    }

    stdArr = stdArr.map(std => std.stdId === editId ? updatedObj : std)

    createStdTrs(stdArr)

    stdForm.reset()
    submitBtn.classList.remove('d-none')
    updateBtn.classList.add('d-none')

    snackbar('Student updated','success')
}


// EVENTS
stdForm.addEventListener('submit', onStdAdd)
updateBtn.addEventListener('click', onStdUpdate)
stdContainer.addEventListener('click', onTableClick)

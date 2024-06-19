const inputBox= document.getElementById('input-box')
const listContainer = document.getElementById('list-container')
const filterTasksDropdown = document.getElementById('filterTasks');


function addTask(){
    if(inputBox.value === ''){
        alert('Don\'t forget about your task!')
    }
    else{
        let li = document.createElement('li')
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li)

        let span = document.createElement('span')
        span.innerHTML = "\u00d7"
        li.appendChild(span)

    }

    inputBox.value = ''
    saveData();
}

listContainer.addEventListener('click',function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();

    }
    else if (e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
},false);

function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML= localStorage.getItem("data");
}
showTask(); 

// Drag drop eta bata suru huncha
let dragSrcEl = null;

function dragStart(e) {
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function dragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function drop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    if (dragSrcEl !== this) {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
        saveData();
        addDragAndDropHandlers(); 
 // Re-add drag and drop handlers after drop
    }
    return false;
}

// Function to add drag and drop handlers to all list items
function addDragAndDropHandlers() {
    const items = listContainer.querySelectorAll('li');
    items.forEach(item => {
        item.draggable = true;
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', drop);
    });
}

// Initial call to add drag and drop handlers to existing list items
addDragAndDropHandlers();


// filter component ko lagi

function filterTasks() {
    const filter = filterTasksDropdown.value;
    const tasks = listContainer.getElementsByTagName('li');
    for (let task of tasks) {
        switch (filter) {
            case 'all':
                task.style.display = 'list-item';
                break;
            case 'completed':
                if (task.classList.contains('checked')) {
                    task.style.display = 'list-item';
                } else {
                    task.style.display = 'none';
                }
                break;
            case 'incomplete':
                if (!task.classList.contains('checked')) {
                    task.style.display = 'list-item';
                } else {
                    task.style.display = 'none';
                }
                break;
        }
    }
}

filterTasksDropdown.addEventListener('change', filterTasks);

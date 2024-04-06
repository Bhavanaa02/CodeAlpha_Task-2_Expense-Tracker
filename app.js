document.getElementById('expenseForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var date = document.getElementById('date').value;
    var category = document.getElementById('category').value;
    var amount = document.getElementById('amount').value;
    var editIndex = document.getElementById('editIndex').value;

    if (editIndex === '') {
        addExpense(date, category, amount);
    } else {
        editExpense(editIndex, date, category, amount);
    }

    resetForm();
});

function addExpense(date, category, amount) {
    var expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push({date: date, category: category, amount: amount});
    localStorage.setItem('expenses', JSON.stringify(expenses));

    var tableBody = document.getElementById('expenseTable').getElementsByTagName('tbody')[0];
    var row = '<tr><td>' + date + '</td><td>' + category + '</td><td>' + amount + '</td><td><button type="button" class="btn btn-sm btn-primary" onclick="editForm(this.parentNode.parentNode)">Edit</button> <button type="button" class="btn btn-sm btn-danger" onclick="deleteExpense(this.parentNode.parentNode)">Delete</button></td></tr>';
    tableBody.insertAdjacentHTML('beforeend', row);
}

function editExpense(index, date, category, amount) {
    var expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses[index] = {date: date, category: category, amount: amount};
    localStorage.setItem('expenses', JSON.stringify(expenses));

    var tableRow = document.getElementById('expenseTable').rows[index+1];
    tableRow.cells[0].innerHTML = date;
    tableRow.cells[1].innerHTML = category;
    tableRow.cells[2].innerHTML = amount;
}

function deleteExpense(row) {
    row.parentNode.removeChild(row);
    var expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    var rowIndex = row.rowIndex - 1;
    expenses.splice(rowIndex, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function editForm(row) {
    var rowIndex = row.rowIndex - 1;
    var expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    var expense = expenses[rowIndex];
    document.getElementById('date').value = expense.date;
    document.getElementById('category').value = expense.category;
    document.getElementById('amount').value = expense.amount;
    document.getElementById('editIndex').value = rowIndex;
    document.getElementById('addButton').innerHTML = 'Update Expense';
}

function resetForm() {
    document.getElementById('date').value = '';
    document.getElementById('category').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('editIndex').value = '';
    document.getElementById('addButton').innerHTML = 'Add Expense';
}

function showExpenses() {
    var expenses = JSON.parse(localStorage.getItem
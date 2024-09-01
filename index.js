const fs = require('fs');
const path = require('path');

//function to check and create expenses.json
function checkExpensesFile() {
    const filePath = path.join(__dirname, 'expenses.json');

    //check if file exists
    if (!fs.existsSync(filePath)) {
        //create file with empty array
        fs.writeFileSync(filePath, '[]', 'utf8');
        console.log('expenses.json created. ');
    }
}

//function call to initialize file
checkExpensesFile();

//function to read expenses from json file
function readExpenses() {
    const filePath = path.join(__dirname, 'expenses.json');
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}

//function to write expenses to json file
function writeExpenses(expenses) {
    const filePath = path.join(__dirname, 'expenses.json');
    fs.writeFileSync(filePath, JSON.stringify(expenses, null, 2), 'utf8');
}

//function to add a new expnse
function addExpense(description, amount) {
    const expenses = readExpenses();

    const newExpense = {
        id: expenses.length + 1,
        description: description,
        amount: parseFloat(amount),
        date: new Date().toISOString().split('T')[0]
    };

    expenses.push(newExpense);
    writeExpenses(expenses);
    console.log(`Expense added successfully (ID: ${newExpense.id})`);
}

//function to list all expenses
function listExpenses() {
    const expenses = readExpenses();

    if (expenses.length === 0) {
        console.log('No expenses recorded. ')
    } else {
        console.log('ID   Date       Description   Amount');
        expenses.forEach(expense => {
            console.log(`${expense.id}  ${expense.date}     ${expense.description}        $${expense.amount.toFixed(2)}`);
        });
    }
}

//function to delete an expense by ID
function deleteExpense(id) {
    let expenses = readExpenses();

    const initialLength = expenses.length;
    expenses = expenses.filter(expense => expense.id !== parseInt(id));

    if (expenses.length < initialLength) {
        expenses = alterIndex(expenses);
        writeExpenses(expenses);
        console.log(`Expense with ID ${id} deleted successfully`);
    } else {
        console.log(`Expense with ID ${id} not found`);
    }
}

//function to alter index after deleting
function alterIndex(expenses) {
    return expenses.map((expense, index) => ({
        ...expense,
        id: index + 1
    }));
}

//function to update an expense by ID
function updateExpense(id, newDescription, newAmount) {
    let expenses = readExpenses();

    const expenseIndex = expenses.findIndex(expense => expense.id === id);
    if (expenseIndex !== -1) {
        const updatedExpense = { ...expenses[expenseIndex] };
        //update description if provided
        if (newDescription) {
            updatedExpense.description = newDescription;
        }
        //update amount if provided
        if (newAmount) {
            updatedExpense.amount = parseFloat(newAmount);
        }
        //update modified date
        updatedExpense.date = new Date().toISOString().split('T')[0];

        expenses[expenseIndex] = updatedExpense;
        writeExpenses(expenses);
        console.log(`Expense with ID ${id} updated successfully`);
    } else {
        console.log(`Expense with ID ${id} not found`);
    }
}

//function to view summary all expenses
function viewSummary() {
    const expenses = readExpenses();
    if (expenses.length === 0) {
        console.log('No expenses found');
        return;
    }
    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    console.log(`Total expenses: $${totalExpenses.toFixed(2)}`);
}

//function to view summary for a specific month
function viewSummaryForMonth(month) {
    const expenses = readExpenses();
    if (expenses.length === 0) {
        console.log('No expenses found');
        return;
    }

    //filtering expenses for the specified month of current year
    const currentYear = new Date().getFullYear();
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const filteredExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getFullYear() === currentYear && (expenseDate.getMonth() + 1) === month;
    });
    if (filteredExpenses.length === 0) {
        console.log(`No expenses recorded for ${monthNames[month-1]} of the current year.`);
        return;
    }

    //calculate total amount for specified month
    const totalExpenses = filteredExpenses.reduce((acc, expense) => acc + expense.amount, 0);
    console.log(`Total expenses for ${monthNames[month-1]}: $${totalExpenses.toFixed(2)}`);
}

//function to export expenses to a csv file
function exportToCSV() {
    const expenses = readExpenses();

    if (expenses.length === 0) {
        console.log('No expenses to export.');
        return;
    }

    // Define the headers for the CSV file
    const headers = 'ID,Date,Description,Amount\n';
    
    // Convert each expense object to a CSV row
    const rows = expenses.map(expense => {
        return `${expense.id},${expense.date},${expense.description},${expense.amount}`;
    }).join('\n');
    
    // Combine the headers and rows
    const csvContent = headers + rows;

    // Define the file path
    const filePath = path.join(__dirname, 'expenses.csv');

    // Write the CSV content to a file
    fs.writeFileSync(filePath, csvContent);
 
    console.log(`Expenses exported successfully to ${filePath}`);
}

//parsing command line arguments
const command = process.argv[2];
const descriptionIndex = process.argv.indexOf('--description');
const amountIndex = process.argv.indexOf('--amount');
const idIndex = process.argv.indexOf('--id');
const monthIndex = process.argv.indexOf('--month');

if (command === 'add' && descriptionIndex !== -1 && amountIndex !== -1) {
    const description = process.argv[descriptionIndex + 1];
    const amount = process.argv[amountIndex + 1];
    addExpense(description, amount);
}
//command for listing expenses
else if (command === 'list') {
    listExpenses();
} //command for deleting an expense
else if (command === 'delete' && idIndex !== -1) {
    const id = parseInt(process.argv[idIndex + 1], 10);
    deleteExpense(id);
} //command for updating expense
else if (command === 'update' && idIndex !== -1) {
    const id = parseInt(process.argv[idIndex + 1], 10);
    const description = process.argv[descriptionIndex + 1];
    const amount = process.argv[amountIndex + 1];
    updateExpense(id, description, amount);
} //command for monthly summary
else if (command === 'summary' && monthIndex !== -1) {
    const month = parseInt(process.argv[monthIndex + 1], 10);
    viewSummaryForMonth(month);
} //command for summary
else if (command === 'summary') {
    viewSummary();
} //command for export to CSV
else if (command === 'export') {
    exportToCSV();
}
else {
    console.log('Usage: node index.js add --description "Lunch" --amount 20');
}


# Expense Tracker CLI

## Overview

**Expense Tracker CLI** is a simple command-line application built with Node.js for managing personal finances. This tool allows users to add, update, delete, and view expenses, generate summaries, and export data to a CSV file.
I got the inspiration from [roadmap](roadmap.sh). You can see the project details [here](https://roadmap.sh/projects/expense-tracker).

## Features

- **Add an Expense:** Record expenses with a description and amount.
- **Update an Expense:** Modify existing expense details.
- **Delete an Expense:** Remove expenses by their ID.
- **View All Expenses:** List all recorded expenses.
- **Monthly Summary:** View a summary of expenses for a specific month.
- **Export to CSV:** Export all expenses to a CSV file for easy analysis.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/BiyiLawal/Expense-Tracker.git
   cd expense-tracker-cli
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the application:**
   ```bash
   node index.js
   ```

## Usage

Here are the commands you can use:

### Add an Expense

```bash
node index.js add --description "Lunch" --amount 20
```

### Update an Expense

```bash
node index.js update --id 1 --description "Dinner" --amount 25
```

### Delete an Expense

```bash
node index.js delete --id 1
```

### View All Expenses

```bash
node index.js list
```

### View a Summary of All Expenses

```bash
node index.js summary
```

### View a Monthly Summary

```bash
node index.js summary --month 8
```

### Export Expenses to CSV

```bash
node index.js export
```

## Data Storage

Expenses are stored in a `JSON` file (`expenses.json`) located in the project directory. This file is automatically created when the application runs for the first time if it doesn’t exist.

## Example Output

Here’s what you might see when using the application:

### Adding an Expense

```bash
node index.js add --description "Groceries" --amount 50
# Output: Expense added successfully (ID: 1)
```

### Listing Expenses

```bash
node index.js list
# Output:
# ID  Date       Description  Amount
# 1   2024-08-06  Groceries    $50
```

### Exporting to CSV

```bash
node index.js export
# Output: Expenses exported successfully to /path/to/your/project/expenses.csv
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

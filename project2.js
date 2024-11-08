document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-button');
    const searchButton = document.getElementById('search-button');
    const productInput = document.getElementById('product');
    const priceInput = document.getElementById('price');
    const searchInput = document.getElementById('search-text');
    const tableBody = document.querySelector('table tbody');

    addButton.addEventListener('click', () => {
        const errors = []; 

        const product = productInput.value.trim().toLowerCase();
        const price = priceInput.value.trim();

        if (product.length < 2) {
            errors.push('At least 2 characters for the product name are required.');
        }

        if (price <= 0) {
            errors.push('Price must be > 0.');
        }

        if (errors.length > 0) {
            alert(errors.join('\n'));
            return;
        }

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${product}</td>
            <td>${price}</td>
            <td><button class="btn btn-danger btn-sm remove-button">Remove</button></td>
        `;

        newRow.querySelector('.remove-button').addEventListener('click', () => {
            newRow.remove();
        });

        tableBody.appendChild(newRow);

        productInput.value = '';
        priceInput.value = '';
    });

    searchButton.addEventListener('click', () => {
        const searchText = searchInput.value.trim().toLowerCase();
        const matches = [];

        Array.from(tableBody.rows).forEach(row => {
            const product = row.cells[0].textContent.toLowerCase();
            const price = row.cells[1].textContent;

            if (product === searchText || price === searchText) {
                matches.push(`Found => {Product: ${product}, Price: ${price}}`);
            }
        });

        if (matches.length > 0) {
            alert(matches.join('\n'));
        } else {
            alert(`"${searchText}" not found in product or price list!`);
        }
    });
});

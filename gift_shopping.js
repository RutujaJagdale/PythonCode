const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// to get user input
function getUserInput(productName) {
    return new Promise((resolve) => {
        rl.question(`Enter the quantity for ${productName}: `, (quantity) => {
            rl.question(`Is ${productName} wrapped as a gift? (yes/no): `, (isGift) => {
                resolve({ quantity: parseInt(quantity, 10), isGift: isGift.toLowerCase() === 'yes' });
            });
        });
    });
}

// to calculate total cost 
async function calculateTotalCost() {
    const priceA = 20;
    const priceB = 40;
    const priceC = 50;

    const flat10Discount = 10;
    const bulk5DiscountPercentage = 5;
    const bulk10DiscountPercentage = 10;
    const tiered50DiscountPercentage = 50;

    const giftWrapFee = 1;
    const shippingFeePerPackage = 5;
    const itemsPerPackage = 10;

    const productA = await getUserInput('Product A');
    const productB = await getUserInput('Product B');
    const productC = await getUserInput('Product C');

    const { quantity: quantityA, isGift: isGiftA } = productA;
    const { quantity: quantityB, isGift: isGiftB } = productB;
    const { quantity: quantityC, isGift: isGiftC } = productC;

    const totalQuantity = quantityA + quantityB + quantityC;
    const cartTotal = quantityA * priceA + quantityB * priceB + quantityC * priceC;

    let discountName = '';
    let discountAmount = 0;

    // for flat 10 discount
    if (cartTotal > 200) {
        discountName = "flat_10_discount";
        discountAmount = flat10Discount;
    }
    //  for bulk 10 discount
    else if (totalQuantity > 20) {
        discountName = "bulk_10_discount";
        discountAmount = (cartTotal * bulk10DiscountPercentage) / 100;
    }
    // for bulk 5 discount on any single product
    else if (quantityA > 10 || quantityB > 10 || quantityC > 10) {
        discountName = "bulk_5_discount";
        discountAmount = (quantityA > 10 ? quantityA * priceA : 0) * (bulk5DiscountPercentage / 100)
            + (quantityB > 10 ? quantityB * priceB : 0) * (bulk5DiscountPercentage / 100)
            + (quantityC > 10 ? quantityC * priceC : 0) * (bulk5DiscountPercentage / 100);
    }
    // for tiered 50 discount
    else if (totalQuantity > 30 && (quantityA > 15 || quantityB > 15 || quantityC > 15)) {
        discountName = "tiered_50_discount";
        discountAmount = (quantityA > 15 ? (quantityA - 15) * priceA : 0) * (tiered50DiscountPercentage / 100)
            + (quantityB > 15 ? (quantityB - 15) * priceB : 0) * (tiered50DiscountPercentage / 100)
            + (quantityC > 15 ? (quantityC - 15) * priceC : 0) * (tiered50DiscountPercentage / 100);
    }

    const subtotal = cartTotal - discountAmount;
    const shippingFee = Math.ceil(totalQuantity / itemsPerPackage) * shippingFeePerPackage;
    const total = subtotal + shippingFee + (isGiftA ? quantityA * giftWrapFee : 0) + (isGiftB ? quantityB * giftWrapFee : 0) + (isGiftC ? quantityC * giftWrapFee : 0);

    // Output details
    console.log("Product A - Quantity: " + quantityA + ", Total: $" + quantityA * priceA);
    console.log("Product B - Quantity: " + quantityB + ", Total: $" + quantityB * priceB);
    console.log("Product C - Quantity: " + quantityC + ", Total: $" + quantityC * priceC);
    console.log("Subtotal: $" + subtotal.toFixed(2));
    console.log("Discount Applied: " + discountName + ", Amount: $" + discountAmount.toFixed(2));
    console.log("Shipping Fee: $" + shippingFee);
    console.log("Gift Wrap Fee for Product A: $" + (isGiftA ? quantityA * giftWrapFee : 0));
    console.log("Gift Wrap Fee for Product B: $" + (isGiftB ? quantityB * giftWrapFee : 0));
    console.log("Gift Wrap Fee for Product C: $" + (isGiftC ? quantityC * giftWrapFee : 0));
    console.log("Total: $" + total.toFixed(2));

    rl.close();
}

//  to calculate total cost
calculateTotalCost();


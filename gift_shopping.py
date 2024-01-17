def calculate_discount(cart, product_quantities):
    total_quantity = sum(product_quantities.values())
    max_quantity = max(product_quantities.values())

    if total_quantity > 30 and max_quantity > 15:
        return "tiered_50_discount", sum(cart.values()) * 0.5
    elif total_quantity > 20:
        return "bulk_10_discount", sum(cart.values()) * 0.1
    elif max_quantity > 10:
        for product in product_quantities:
            if product_quantities[product] > 10:
                return "bulk_5_discount", cart[product] * 0.05
    elif sum(cart.values()) > 200:
        return "flat_10_discount", 10

    return None, 0

def calculate_total(cart, product_quantities, gift_wrap_fee, shipping_fee):
    discount_rule, discount_amount = calculate_discount(cart, product_quantities)
    subtotal = sum(cart.values())
    total_discounted_amount = subtotal - discount_amount
    total_gift_wrap_fee = sum(product_quantities.values()) * gift_wrap_fee
    total_shipping_fee = (sum(product_quantities.values()) // 10) * shipping_fee
    total = total_discounted_amount + total_gift_wrap_fee + total_shipping_fee

    return discount_rule, discount_amount, subtotal, total_gift_wrap_fee, total_shipping_fee, total

def display_receipt(cart, product_quantities, gift_wrap_fee, shipping_fee):
    print("Product Details:")
    for product in cart:
        print(f"{product}: Quantity: {product_quantities[product]}, Total: ${cart[product]}")

    discount_rule, discount_amount, subtotal, total_gift_wrap_fee, total_shipping_fee, total = calculate_total(
        cart, product_quantities, gift_wrap_fee, shipping_fee)

    print("\nSubtotal: ${}".format(subtotal))
    if discount_rule:
        print("Discount Applied: {} - ${}".format(discount_rule, discount_amount))
    print("Gift Wrap Fee: ${}".format(total_gift_wrap_fee))
    print("Shipping Fee: ${}".format(total_shipping_fee))
    print("\nTotal: ${}".format(total))

# Helper function for calculating product total
def calculate_product_total(quantity, price, gift_wrap_fee):
    return quantity * price + (gift_wrap_fee * quantity)

# Main function
def main():
    products = {"Product A": 20, "Product B": 40, "Product C": 50}
    gift_wrap_fee = 1
    shipping_fee = 5

    product_quantities = {}

    for product in products:
        quantity = int(input("Enter the quantity of {} you want to purchase: ".format(product)))
        is_gift_wrapped = input("Is {} gift wrapped? (yes/no): ".format(product)).lower() == "yes"
        
        total_amount = calculate_product_total(quantity, products[product], gift_wrap_fee) \
                        if is_gift_wrapped else calculate_product_total(quantity, products[product], 0)
        
        product_quantities[product] = quantity
        print("{}: Quantity: {}, Total Amount: ${}".format(product, quantity, total_amount))

    display_receipt(products, product_quantities, gift_wrap_fee, shipping_fee)

if __name__ == "__main__":
    main()

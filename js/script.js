$(() => {
	const $products = $('.js-product');
	const $cart = $('.js-cart');
	const $cartCount = $('.js-cart-count');
	const $cartReset = $('.js-cart-reset');
	const cartLimit = 300;
	let cartTotalPrice = 0;
	let cartTotalCount = 0;

	$products.each((i) => {
		const $product = $products.eq(i);

		$product.draggable({
			appendTo: $cart,
			zIndex: 99,
			revert: 'invalid',
		});
	});

	$cart.droppable({
		hoverClass: 'field_hover',
		drop: (e, ui) => {
			const $el = ui.draggable;
			const $clone = $el.clone();
			const prie = $el.data('price');

			if(cartTotalPrice + prie <= cartLimit) {
				cartTotalPrice += prie;
				cartTotalCount++;
				$cart.append($clone.css({
					top: 'auto',
					left: 'auto',
				}));
				$cart.trigger('update.cart');
			} else {
				alert('Недостаточно средств!');
			}

			$el.css({
				top: 'auto',
				left: 'auto',
				zIndex: 1,
			});
		},
	});

	$cart.off('.cart').on({
		'update.cart': () => {
			$cartCount.text(cartTotalCount);
		}
	});

	$cart.trigger('update.cart');

	$cartReset.off('.cart').on({
		'click.cart': () => {
			$cart.text('');
			cartTotalPrice = cartTotalCount = 0;
			$cart.trigger('update.cart');
		},
	})
});

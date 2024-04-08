$(document).ready(function() {
	const checkedAmenities = {};

	$('input[type="checkbox"]').change(function() {
		const amenityId = $(this).attr('data-id');
		const amenityName = $(this).attr('data-name');

		if ($(this).prop('checked')) {
			checkedAmenities[amenityId] = amenityName;
		} else {
			delete checkedAmenities[amenityId];
		}
	const amenitiesList = Object.values(checkedAmenities).join(', ');
	$('.amenities h4').text(amenitiesList);
	$('#checkedAmenitiesList').text("Checked amenities:" + amenitiesList);
	});

    $.ajax({
        type: "GET",
        url: "http://0.0.0.0:5001/api/v1/status/",
        success: function(response) {
			if (response.status === 'OK') {
                $('DIV#api_status').addClass('available');
            } else {
                $('DIV#api_status').removeClass('available');
                }
        }
    });
    $.ajax({
        type: 'Post',
        url: 'http://0.0.0.0:5001/api/v1/places_search',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function (places) {
            for (const place of places) {
            appendArticle(place);
            }
        }
    });
});
function appendArticle (place) {
    const guestS = place.max_guest !== 1 ? 'Guests' : 'Guest';
    const roomS = place.number_rooms !== 1 ? 'Bedrooms' : 'Bedroom';
    const bathroomS = place.number_bathrooms !== 1 ? 'Bathrooms' : 'Bathroom';
    $('section.places').append(`
    <article>
    <div class="title_box">
    <h2>${place.name}</h2>
    <div class="price_by_night">$${place.price_by_night}</div>
    </div>
    <div class="information">
        <div class="max_guest">${place.max_guest} ${guestS}</div>
            <div class="number_rooms">${place.number_rooms} ${roomS}</div>
            <div class="number_bathrooms">${place.number_bathrooms} ${bathroomS}</div>
    </div>
        <div class="description"><p>${place.description}</p></div>
    </acrticle>
    `);
    }
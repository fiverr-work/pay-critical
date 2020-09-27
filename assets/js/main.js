$(() => {
	// var input = document.querySelector("#phone");
	// window.intlTelInput(input);
});


// ====== [BEGIN] Toggle Balence Value ======
$(".toggle-balence").click(() => {
	$('#balence-value').toggleClass("balence-visibility");
});
$(".eye-off").click(() => {
	$('.eye-off').addClass("d-none");
	$('.eye-on').removeClass("d-none");
});
$(".eye-on").click(() => {
	$('.eye-on').addClass("d-none");
	$('.eye-off').removeClass("d-none");
});
// ====== [END] Toggle Balence Value ======


// Detect Click Event Outside of an Element
$(document).on("click", function (event) {
	if ($(event.target).closest(".search").length === 0) {
		$(".search").removeClass("input-focus");
	}
});


// Search input on focus change icon color
$(".search-field").focus(() => {
	$(".search").addClass("input-focus");
});


// ====== [BEGIN] Custom Select ======
$(".custom-select").each(function () {
	var classes = $(this).attr("class");
	var template = '<div class="' + classes + '">';
	template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + '</span>';
	template += '<div class="custom-options">';
	$(this).find("option").each(function () {
		template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
	});
	template += '</div></div>';
	$(this).wrap('<div class="custom-select-wrapper"></div>');
	$(this).hide();
	$(this).after(template);
});
$(".custom-option:first-of-type").hover(function () {
	$(this).parents(".custom-options").addClass("option-hover");
}, function () {
	$(this).parents(".custom-options").removeClass("option-hover");
});
$(".custom-select-trigger").on("click", function () {
	$('html').one('click', function () {
		$(".custom-select").removeClass("opened");
	});
	$(this).parents(".custom-select").toggleClass("opened");
	event.stopPropagation();
});
$(".custom-option").on("click", function () {
	$(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
	$(this).parents(".custom-options").find(".custom-option").removeClass("selection");
	$(this).addClass("selection");
	$(this).parents(".custom-select").removeClass("opened");
	$(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
	let trigger = $(this).parents(".custom-select").find(".custom-select-trigger");
	trigger.addClass('hover-selected');
	trigger.parent().parent().siblings('svg').children('path').addClass('hover-selected');
});
$(".custom-option").click(() => {
	$(".custom-select-trigger").addclass("selected");
});
// ====== [END] Custom Select ======


// ====== [BRGIN] Multiple Select ======
$('.multiple-select').click(function () {
	$(this).siblings('.list-options').toggleClass('opened');
	if (!$(this).hasClass('active') && ($('.list-options > span').hasClass('active') || $('.list-options').hasClass('opened')))
		$(this).addClass('active');
	else if ($(this).hasClass('active') && !$('.list-options > span').hasClass('active') && !$('.list-options').hasClass('opened'))
		$(this).removeClass('active');
});
$('.list-options > span').click(function () {
	$(this).toggleClass('active');
	let value = $(this).text();
	let tag = ".tag:contains(" + value + ")";
	if ($(tag).length)
		$(tag).remove();
	else {
		tag = "<div class='animated zoomIn tag " + value.toLowerCase() + "-btn'><svg class='close-tag' width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='www.w3.org/2000/svg'><path d='M15 5L5 15' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' /> <path d='M5 5L15 15' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' /></svg>" + value + "</div>";
		$('.tags').append(tag);
	}

	//Close a tag
	$('.close-tag').click(function () {
		let tag = $(this).parent();
		let span = "span:contains('" + tag.text().substring(1) + "')";
		$('.list-options').find(span).removeClass('active');
		tag.remove();
	});
});
// ====== [END] Multiple Select ======


// Detect Click Event Outside of multiple select dropdown list
$(document).on("click", function (event) {
	if ($(event.target).closest(".dropdown-multiple").length === 0) {
		$(".list-options").removeClass("opened");
		if ($('.list-options > span').hasClass('active'))
			$('.multiple-select').addClass('active');
		else
			$('.multiple-select').removeClass('active');
	}
});


// ====== [BEGIN] Ripple Button Effect ======
const root = document.documentElement;
document.addEventListener("mousedown", ev => {
	let el = ev.target,
		top = 0,
		left = 0;
	// this loop to get every button on the page
	do {
		top += el.offsetTop;
		left += el.offsetLeft;
	} while (el = el.offsetParent);
	const x = (ev.clientX - left) / ev.target.offsetWidth;
	const y = (ev.clientY - top) / ev.target.offsetHeight;
	// give these values to CSS root element to feed them to 'left' & 'right' properties
	root.style.setProperty("--ripple-x", x);
	root.style.setProperty("--ripple-y", y);
})
// ====== [END] Ripple Button Effect ======


//Submenu Toggler
$("li.nav-link").click(function () {
	$(this).children(".submenu").toggleClass("submenu-open");
	$(".submenu").not($(this).children(".submenu")).removeClass("submenu-open");
});
$(".submenu").click(function () {
	$(this).toggleClass("submenu-open");
});

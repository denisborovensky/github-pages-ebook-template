var translit = function(word) {
  var answer = '';
  var converter = {
    'а': 'a',    'б': 'b',    'в': 'v',    'г': 'g',    'д': 'd',
    'е': 'e',    'ё': 'e',    'ж': 'zh',   'з': 'z',    'и': 'i',
    'й': 'y',    'к': 'k',    'л': 'l',    'м': 'm',    'н': 'n',
    'о': 'o',    'п': 'p',    'р': 'r',    'с': 's',    'т': 't',
    'у': 'u',    'ф': 'f',    'х': 'h',    'ц': 'c',    'ч': 'ch',
    'ш': 'sh',   'щ': 'sch',  'ь': '',     'ы': 'y',    'ъ': '',
    'э': 'e',    'ю': 'yu',   'я': 'ya',
 
    'А': 'A',    'Б': 'B',    'В': 'V',    'Г': 'G',    'Д': 'D',
    'Е': 'E',    'Ё': 'E',    'Ж': 'Zh',   'З': 'Z',    'И': 'I',
    'Й': 'Y',    'К': 'K',    'Л': 'L',    'М': 'M',    'Н': 'N',
    'О': 'O',    'П': 'P',    'Р': 'R',    'С': 'S',    'Т': 'T',
    'У': 'U',    'Ф': 'F',    'Х': 'H',    'Ц': 'C',    'Ч': 'Ch',
    'Ш': 'Sh',   'Щ': 'Sch',  'Ь': '',     'Ы': 'Y',    'Ъ': '',
    'Э': 'E',    'Ю': 'Yu',   'Я': 'Ya',

    ' ': '-',    '.': '-',    '_': '-',    '?': '',     ':': ''
  };
 
  for (i in word){
    if (word.hasOwnProperty(i)) {
      if (converter[word[i]] === undefined){
        answer += word[i];
      } else {
        answer += converter[word[i]];
      }
    }
  }
 
  return answer;
}

var navMenu = function(menu) {
  $("section h2, section h3").each(function(){
    $(menu + " ul").append("<li class='tag-" + translit(this.nodeName.toLowerCase()) + "'><a href='#" + translit($(this).text().toLowerCase()) + "'>" + $(this).text() + "</a></li>");
    $(this).attr("id",translit($(this).text().toLowerCase()));
    $(menu + " ul li:first-child a").parent().addClass("active");
  });

  $(menu + " ul li").on("click", "a", function(event) {
    var position = $($(this).attr("href")).offset().top - 60;
    $("html, body").animate({scrollTop: position}, 400);
    $(menu + " ul li a").parent().removeClass("active");
    $(this).parent().addClass("active");
    event.preventDefault();
  });
}

var sectionHeight = function() {
    var total    = $(window).height(),
        $section = $("section").css("height", "auto");
  
    if ($section.outerHeight(true) < total) {
      var margin = $section.outerHeight(true) - $section.height();
      $section.height(total - margin - 20);
    } else {
      $section.css("height", "auto");
    }
  }
  
$(window).resize(sectionHeight);
  
$(function() {
  var sidebar_menu = "nav";
  var popup_menu = ".menu-popup";

	$(".menu-triger, .menu-close").click(function(event){
		$(popup_menu).slideToggle(300, function(){
			if ($(popup_menu).is(":hidden")) {
				$("body").removeClass("body_pointer");
			} else {
				$("body").addClass("body_pointer");
			}
		});
    event.preventDefault();
	});

	$(document).on("click", function(event){
		if (!$(event.target).closest(".menu").length){
			$("body").removeClass("body_pointer");
			$(popup_menu).slideUp(300);
		}
	});

  $("#scroll").on("click", function() {
    $("html, body").animate({scrollTop: 0}, 400);
  });

  navMenu(sidebar_menu);

  navMenu(popup_menu);
  
  sectionHeight();
  
  $("img").on("load", sectionHeight);
});

// A $( document ).ready() block.
jQuery( document ).ready(function() {

	jQuery.expr[":"].Contains = jQuery.expr.createPseudo(function(arg) {
		return function( elem ) {
			return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
		};
	});
	 
    console.log( "ready!" );
	if (annyang) {
		// Let's define our first command. First the text we expect, and then the function it should call
		var commands = {
		'go to *term': function(term) {
			console.log(term);
			if(term == 'e store'){
				term = 'e-store';
				console.log("Assigned");
			}else if(term == "news and media"){
				term = 'news & media';	
			}else{
				console.log("Keyword accepted");
			}
			 // $('a:contains(' + term + ')').first().css("font-weight","bold");
			  var loc = jQuery('a:Contains(' + term + ')').first().attr("href");
			  if(loc != null){
				window.location = loc;
			  }else{
				console.log("Keyword not found");
			  }	  
		},
		'stop audio': function(){
			console.log("Bingo");
			window.speechSynthesis.pause();
		},
		'start audio': function(){
			console.log("Bingo again");
			window.speechSynthesis.resume();
		}
	};

	// Add our commands to annyang
	annyang.addCommands(commands);

	// Start listening. You can call this here, or attach this call to an event, button, etc.
	annyang.start();
	}


	
	var readContent = function(content){
		var text = new SpeechSynthesisUtterance(content);
		text.lang = 'en-GB';
		window.speechSynthesis.speak(text);
	};
	
	var menuReading = function(){
		
		readContent("Sections are ");
		
		jQuery("ul#menu-newmenu-1 li a").each(function(){
			var content = jQuery(this).text();
			readContent(content);
		});	
	};
	
	var readWebPageDetails = function(){

		jQuery("section div.container:visible").each(function(){
			jQuery(this).find("a:visible, p:visible, span:visible").each(function(){
				var content = jQuery(this).text();
				readContent(content);
			});
		});		
	};

	var setAudioCookie = function(val){
	
		var v = (val == true) ? 1 : 0;
		var date = new Date();
		date.setTime(date.getTime() + (5 * 60 * 1000)); //5 * 60 * 1000
		jQuery.cookie("isAudioEnabled", v, { expires: date });
	};
	
	var getAudioCookieValue = function(){
		var val = jQuery.cookie("isAudioEnabled");
		if(val == 1){
			return true;
		}else{
			return false;
		}
	};
	
	var startReading = function(){
		//readContent("Welcome to Giftabled.org");
		var title = jQuery("title").text();
		if(title != undefined || title != null){
			console.log(title);
			readContent("You are on " + title);
		}
		
		var descriptionObj = jQuery("meta[name=description]");
		if(descriptionObj != undefined || descriptionObj != null){
			var description = descriptionObj.attr("content");
			if(description != undefined || description != null){
				readContent(description);
			}
		}
		
		setTimeout(function(){
		    readContent("I will now read out the web page for you.");
			readContent("You can stop audio by saying stop audio and to resume audio say start audio");
			readContent("I will now speak all the available sections in this website.");
			readContent("Speak go to section name to change the section. For example go to Photo Gallary to see the images");
			menuReading();
			setTimeout(function(){
				readContent("I will now read the page description");				
				readWebPageDetails();
			}, 5000);

		}, 5000);
	};

/*	
	annyang.addCallback("resultNoMatch", function(phrases){
	    console.log("cannot recognize");
		readContent("Please try again");
	});
*/
	
	if(jQuery.cookie("isAudioEnabled") == undefined){
		
		console.log("Audio prefs not set yet!!");
		
		readContent('Press Space bar if you are visually impaired or press escape to continue without audio.');
		
		var r = confirm('Press Space bar if you are visually impaired or press esc to continue without audio.');
		if (r == true) {
			console.log("Thank you");
			setAudioCookie(true);
			startReading();
		} else {
			//clearTimeout(timerObj);
			setAudioCookie(false);
		}
	
	}else if(getAudioCookieValue() == true){
		console.log("User already enabled audio!!");
		startReading();
	}else{
		console.log("User disabled audio!!");
	}
});
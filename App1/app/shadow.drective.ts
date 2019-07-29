import { Directive, ElementRef, Renderer2, Output, Input, OnChanges, SimpleChanges,HostListener, AfterViewInit } from '@angular/core';


@Directive(
    { 
        selector: '[ccMarkDown]',  
 })
export class ShadowDirective {
    @Input() public name : any;
     
    @HostListener('keyup' , ['$event']) onMouonValueChangeseOut(event)
    {
        var str = event.srcElement.value;
        var indexOfLink;
        
        str = (""+str);

        str=ShadowDirective.createString(str,"**","**","<strong>","</strong>");
        str=ShadowDirective.createString(str,"//","//","<em>","</em>");
        str= ShadowDirective.createString(str,"[[","]]",' <a href=\"',"</a>");
        ShadowDirective.createPreview(str);
        
    }
    constructor(private renderer: Renderer2, private elementRef:ElementRef, el:ElementRef ) {
        var startIndex = el.nativeElement.selectionStart;
        var endIndex = el.nativeElement.selectionEnd;
    
        const child = document.createElement('div');
   
        this.renderer.appendChild(this.elementRef.nativeElement.parentNode, child);
       
        ShadowDirective.createElement(el,'button','B','**',child);
        ShadowDirective.createElement(el,'button','I','//',child);
        ShadowDirective.createElement(el,'button','link','[[',child);

    }

public static createElement(el,elementName,innerHtmlText,notation,childtoAppend){
    const childNew = document.createElement(elementName);
        childNew.innerHTML = innerHtmlText;
        childNew.addEventListener("click", function(){
            if(!ShadowDirective.isTextSelected(el))
                return;

            ShadowDirective.createStringUsingControl(el,notation);
        });
        childtoAppend.appendChild(childNew);
}
  
public static replaceAt(str,index, replacement, replacementLength) {
    return (""+str).substr(0, index) + replacement+ (""+str).substr(index + replacementLength);        
}

public static isTextSelected(el)
{
    return !(el.nativeElement.selectionStart===0 && el.nativeElement.selectionEnd===0);
}

public static createPreview(stringOfPreview){
    if(document.getElementById("newPreview") === null){
        const childP = document.createElement('p');
        childP.id="newPreview";
        childP.innerHTML = stringOfPreview;
        document.body.appendChild(childP);
    
    }
    else{
        document.getElementById("newPreview").innerHTML = stringOfPreview;
    }
    
  
}

public static createString(mainString, notationStart,notationEnd ,startTag, endTag){
             
    var sub = mainString;
    var index1 = 0;
    var index2;
    while(true) {
        index1 = mainString.indexOf(notationStart);
        if (index1 < 0) {
            break;
        }
        sub = mainString.substring(index1 + notationStart.length);
        index2 = sub.indexOf(notationEnd);
                    
        if (index2 < 0) {
            break;
        } 
        if(notationStart === "[["){
            index2 = mainString.indexOf(notationEnd);
            var textOnLink = mainString.substring(mainString.indexOf("|")+1, index2);
            mainString = mainString.replace(textOnLink+"]]"," ");
            mainString = ShadowDirective.replaceAt(mainString, index1,' <a href=\"',notationStart.length);
            mainString = ShadowDirective.replaceAt(mainString, mainString.indexOf("|"),'\"'+" "+'target=\"_blank\">'+textOnLink+'</a>',notationEnd.length);  
        }
        else{
            mainString = ShadowDirective.replaceAt(mainString, index1, startTag, notationStart.length);
            index2 = mainString.indexOf(notationEnd);
            mainString= ShadowDirective.replaceAt(mainString, index2, endTag, notationEnd.length);
        }
    }

            
    return mainString; 
}

    public static createStringUsingControl (el,notation){
        var str = "" + el.nativeElement.value;
       
        if(notation === "[["){
            if(str.substr(el.nativeElement.startIndex,4).toLowerCase() === "http"){
                str=
                ["" + str.slice(0, el.nativeElement.selectionStart), "[[", "" + 
                str.slice(el.nativeElement.selectionStart,el.nativeElement.selectionEnd),"|Click here]]" +
                 str.slice(el.nativeElement.selectionEnd)].join('');
               
            }
            else{
                str=
                ["" + str.slice(0, el.nativeElement.selectionStart), "[[", "http://example.com" + 
                str.slice(el.nativeElement.selectionStart,el.nativeElement.selectionEnd),"|"+
                str.substring(el.nativeElement.selectionStart,el.nativeElement.selectionEnd)+"]]" +
                 str.slice(el.nativeElement.selectionEnd)].join('');
            }
        }
        else{
            str=
            ["" + str.slice(0, el.nativeElement.selectionStart), notation, "" + 
            str.slice(el.nativeElement.selectionStart,el.nativeElement.selectionEnd),notation +
            str.slice(el.nativeElement.selectionEnd)].join('');
        }
        
        el.nativeElement.value = str;
        str = ShadowDirective.createString(str,"**","**","<strong>","</strong>");
        str = ShadowDirective.createString(str,"//","//","<em>","</em>");
        str= ShadowDirective.createString(str,"[[","]]",' <a href=\"',"</a>");
        
        ShadowDirective.createPreview(str);
    }
    
}
/**
 * Minimal Dropdown library
 * Author: Hamza Riaz Waheed 
 * https://github.com/HamzaRiazWaheed/DropDownLibrary
 */

if(!window.Dropdown){
    window.Dropdown = (function(){
        var dd = {
            dropown : function(element, options, callback){
                var selectEvent = new Event('select');
                var self = this;
                // options Passed
                self.options = {
                    data : (function(){
                        try {
                             return options.data.map(function(m){
                                return m.toLowerCase()
                            })
                        }catch {
                            console.error('The Array passed is not of right format! Please check its a falt array like [val,val,val]')
                        }
                       
                    })(),                    
                }
                // The selected element
                self.elem = document.getElementById(element);
                self.getValue = {
                    value : null,
                    index : null
                };
                // adding the html and basic functionality
                self.init = function(){

                    if(!self.elem){
                        console.log(self.elem)
                        console.error('Not a valid element! Select the element by ID.');
                        return;
                    }

                    var input = document.createElement('input');
                    input.className += 'search-input';
                    input.setAttribute('type', 'text');

                    self.elem.className += 'dropdown-wrapper';

                    // create list
                    var listWrapper = document.createElement('div');
                    listWrapper.setAttribute('class', 'dropdown-list-wrapper');

                    for(var i=0; i< self.options.data.length; i++){
                        
                        var listItem = document.createElement('span');
                        listItem.innerText = self.options.data[i];
                        listItem.setAttribute('class', 'list-item')
                        listWrapper.appendChild(listItem);

                    }
                    listWrapper.addEventListener('click', function(e){
                        var val = e.target.innerText.toLowerCase()
                        var ind = self.options.data.indexOf(val)
                        
                        input.value = val;
                        self.getValue.value = options.data[ind];
                        self.getValue.index = ind;
                        self.elem.dispatchEvent(selectEvent);
                        
                    })

                    input.addEventListener('focus', function(e){
                        listWrapper.style.display = 'block';
                    })

                    input.addEventListener('input', function(){
                        if(listWrapper.style.display == 'none'){
                            listWrapper.style.display = 'block';
                        }
                        var child = listWrapper.children;
                        var val = this.value.toLowerCase();
                        for(var i=0; i < child.length; i++){
                            var text = child[i].innerText.toLowerCase()
                            if(text.indexOf(val) < 0){
                                child[i].style.display = 'none'
                            }else {
                                child[i].style.display = ''
                            }
                        }
                    })

                    input.addEventListener('keyup', function(e){
                        if(e.keyCode == 13 || e.key == 'enter'){
                            var val = this.value.toLowerCase();
                            if(self.options.data.indexOf(val) > -1){
                                var ind = self.options.data.indexOf(val)
                                self.getValue.value = options.data[ind];
                                self.getValue.index = ind;   
                                self.elem.dispatchEvent(selectEvent);
                            }else {
                                console.error('Selected Value doesnot exist in the data passed to this dropdown');
                            }
                            listWrapper.style.display = 'none';
                        }
                    })


                    self.elem.appendChild(input);
                    self.elem.appendChild(listWrapper);

                    document.addEventListener('click', function(e){

                        if(e.target !== self.elem && e.target !== input && e.target !== listWrapper){
                            listWrapper.style.display = 'none';
                        }

                    });

                    if(callback){
                        self.elem.addEventListener('select', function(){
                            callback(self.getValue.value, self.getValue.index)
                        })
                    }

                }
                self.setValue = function(val){
                    var input = self.elem.getElementsByTagName('input')[0];
                    val = val.toLowerCase()
                    if(self.options.data.indexOf(val) > -1){
                        input.value = val;
                        var ind = self.options.data.indexOf(val)
                        self.getValue.value = options.data[ind];
                        self.getValue.index = ind;   
                                             
                    }else {
                        console.error('Value "' + val + '" doesn\'t exists in data you passed to the element')
                    }   
                }
                self.onSelect = function(callback){
                    self.elem.addEventListener('select', function(){
                        callback(self.getValue.value, self.getValue.index);
                    })
                }
                self.init(); 
            }
        }
        return dd.dropown;
    })();
}
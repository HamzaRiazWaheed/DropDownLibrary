# Dropdown.js

Minimalist JS library for making searchable dropdown list.

## HOW TO USE

### Example 1

``` javascript
var DD = new Dropdown('dd1',  { data : ['arr', 'two', 'three']}, function(value, index){
    console.log(value, index)
})
```

### Example 2

``` javascript
var DD = new Dropdown('dd1',  { data : ['arr', 'two', 'three']})

DD.onSelect(function(value, index){
    console.log(value, index)
})
```

There are two *Required* parameters as seen in the both examples

- `dd1` is the element ID on which the dropdown is initialised.
- Second is the `options` object that expects a `data` key who's value is a Flat array.

NOTE: _All Values in the data array are converted to lowerCase for visual consistency in the dropdown list_

#### Getting the selected Value

Optional parameter is the last callback function as seen in the example 1 that is called when a value is selected form the dropdown list.
To get the selected value later in the code the `onSelect` function as seen in the example 2 can be use.

Both functions recieve two parameters 1st is selected value and 2nd is selected values index in the data array passed to the dropdown.

#### Setting value

``` javascript
DD.setValue(function(val){
    console.log(val)
})
```

The `setValue` function can be used to set the dropdown value dynamically

#### Get Value

``` javascript
var value = DD.getValue;
```

`value = {value: "three", index: 2}`

`DD.getValue` gets the value for the dropdown that has been currently set or selected.
This gives the selected value and its index in the data array that was passed to this Dropdown.

NOTE: The Callback or `onSelect` gives you the value on select event. `getValue` just gives the object that was selected. When nothing has been selected yet it will give `{value : null, index : 0 }`, its value gets updated whenever a selection is made.

## Styles

There are minimal styles set in the `dropdown.css` file. Its completely optional. These are very basic styles and you will still have to add the custom styles according to your theme.

## Liscence

MIT

A simple, small jQuery form validator with tooltips
---------------------------------------------------

[Screenshot example](http://i.imgur.com/kIiGaPb.jpg)

### Usage

Include the plugin after you've loaded jQuery, preferably before the closing `</body>` tag:

```
<script src='https://code.jquery.com/jquery-2.1.1.min.js'></script>
<script src='simpleformvalidator.min.js'></script>
```

Ensure your form has a name, class or ID so jQuery can select it:

```
<form method='POST' action='?' class='myForm'>
...
</form>
```

Then inside your document ready function call the plugin on your form:

```
<script>
	jQuery(document).ready(function($){
		$('.myForm').simpleFormValidator();
	});
</script>
```

### Options
| Option              | Description |
| ------------------- | ----------- |
| `toolTipClassName`  | The class to be applied to all tooltips |
| `toolTipIdPrefix`   | A prefix for the ID of all tooltips, this is appended with a number |
| `toolTipOffsetTop`  | The number of pixels from the top of the element the tooltip should render |
| `toolTipMarginLeft` | The size of the margin to the left of the tooltip |
| `triangleOffsetTop` | The number of pixels added to the toolTipOffsetTop for the little triangle's vertical position |
| `toolTipColour`     | Text colour for the tooltip |
| `toolTipBackground` | Background colour for the tooltip |
| `toolTipOpacity`    | Opacity in percent of the tooltip |

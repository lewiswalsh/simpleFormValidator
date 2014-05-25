A simple, small jQuery form validator with tooltips
---------------------------------------------------

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

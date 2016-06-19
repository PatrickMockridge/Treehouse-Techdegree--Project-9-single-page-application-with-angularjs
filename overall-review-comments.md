
# Overall Review Comments

Patrick,

Really awesome job hanging in there as you spiked on learning AngularJS! I'm impressed with your tenacity and coding skills.

I added comments inline with your code as well as some general comments below. Not all of my comments need to be fixed in order for your project to successfully pass the official code review. Some of my comments are just some general recommendations and/or thoughts.

Thanks,
James

## Functionality

* On the list page, display "Name" instead of "Description".
* Clicking "Add Recipe" ideally shouldn't create a recipe until the user saves the new recipe.
 * Otherwise if you click "Add Recipe" and then "Cancel" you still have a new recipe in the list.
* On the detail page, after clicking "Save Recipe" send the user back to the list page.

## Organization

* How about splitting up your Angular code into multiple files?

## Code

* Did you need to add the jQuery library?
* My personal preference tilts towards having more whitespace in code files.
* I would also make sure that your code is consistently indented. It's a small thing, but very helpful for others when they are reading your code.

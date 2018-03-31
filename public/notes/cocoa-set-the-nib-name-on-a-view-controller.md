When you create `NSViewController` and makes it the owner of a view nib, the controller and the nib has to have the same name otherwise the controller will fails loading the nib.

From `NSViewController` source file:

> On 10.10 and higher, a nil nibName can be used, and NSViewController will automatically attempt to load a view with the same class name.

It is important to notice that even this comment states that will attempt to load a view with the same class name, it seems to be attempting the file name instead.

`NSViewController` `-loadView` comment:

> Prior to 10.10, -loadView would not have well defined behavior if [self nibName] returned nil. On 10.10 and later, if nibName is nil, NSViewController will automatically try to load a nib with the same name as the classname. This allows a convenience of doing [[MyViewController alloc] init] (which has a nil nibName) and having it automatically load a nib with the name "MyViewController".

Having a controller with the name `MyViewController` and a view with the name `MyView` wouldn't work because the controller will attempt to load a nib with the name `MyViewController`. Naming a view `MyViewController` doesn't make sense because it is not a controller.

What should we do here? use the method `-nibName` to set the default nib name.

In your controller implementation file add the following method:

```objective-c
- (NSNibName)nibName
{
    return @"MyView";
}
```

> `NSNibName` is an alias for `NSString`.

Now the controller will attempt to load `MyView` nib instead of a `MyViewController`.

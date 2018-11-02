# Feature component

## Props

- name ( optional ) : Allow you to filter the component on the feature's name

```
{
    overview:"true"
}

<Feature name="overview">
    <Overview/>
</Feature>
```

Will render the overview passing a prop "features" with the features Immutable Map
if this props is not passed, the children will always be rendered

- statePath (optional): Allow you to override the default path to get the features collection

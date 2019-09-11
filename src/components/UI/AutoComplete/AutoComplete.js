
// import React from 'react';
// import PropTypes from 'prop-types';
// import Select from 'react-select';
// import { emphasize, makeStyles, useTheme } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
// import NoSsr from '@material-ui/core/NoSsr';
// import TextField from '@material-ui/core/TextField';
// import Paper from '@material-ui/core/Paper';
// import MenuItem from '@material-ui/core/MenuItem';
// import { withRouter } from 'react-router';


// // const suggestions = [
// // //     { label: 'Afghanistan' },
// // //     { label: 'Aland Islands' },
// // //     { label: 'Albania' },
// // //     { label: 'Algeria' },
// // //     { label: 'American Samoa' },
// // //     { label: 'Andorra' },
// // //     { label: 'Angola' },
// // //     { label: 'Anguilla' },
// // //     { label: 'Antarctica' },
// // //     { label: 'Antigua and Barbuda' },
// // //     { label: 'Argentina' },
// // //     { label: 'Armenia' },
// // //     { label: 'Aruba' },
// // //     { label: 'Australia' },
// // //     { label: 'Austria' },
// // //     { label: 'Azerbaijan' },
// // //     { label: 'Bahamas' },
// // //     { label: 'Bahrain' },
// // //     { label: 'Bangladesh' },
// // //     { label: 'Barbados' },
// // //     { label: 'Belarus' },
// // //     { label: 'Belgium' },
// // //     { label: 'Belize' },
// // //     { label: 'Benin' },
// // //     { label: 'Bermuda' },
// // //     { label: 'Bhutan' },
// // //     { label: 'Bolivia, Plurinational State of' },
// // //     { label: 'Bonaire, Sint Eustatius and Saba' },
// // //     { label: 'Bosnia and Herzegovina' },
// // //     { label: 'Botswana' },
// // //     { label: 'Bouvet Island' },
// // //     { label: 'Brazil' },
// // //     { label: 'British Indian Ocean Territory' },
// // //     { label: 'Brunei Darussalam' },
// // // ].map(suggestion => ({
// // //     value: suggestion.label,
// // //     label: suggestion.label,
// // // }));



// const useStyles = makeStyles(theme => ({
//     root: {
//         flexGrow: 1,
//         height: '100%',
//         minWidth: 200,
//         maxWidth: 400,
//     },
//     input: {
//         display: 'flex',
//         padding: 0,
//         height: 'auto',
//     },
//     valueContainer: {
//         display: 'flex',
//         flexWrap: 'wrap',
//         flex: 1,
//         alignItems: 'center',
//         overflow: 'hidden',
//     },
//     chip: {
//         margin: theme.spacing(0.5, 0.25),
//     },
//     chipFocused: {
//         backgroundColor: emphasize(
//             theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
//             0.08,
//         ),
//     },
//     noOptionsMessage: {
//         padding: theme.spacing(1, 2),
//     },
//     singleValue: {
//         fontSize: 16,
//     },
//     placeholder: {
//         position: 'absolute',
//         left: 2,
//         bottom: 6,
//         fontSize: 16,
//         color: 'white'
//     },
//     paper: {
//         position: 'absolute',
//         zIndex: 1,
//         marginTop: theme.spacing(1),
//         left: 0,
//         right: 0,
//     },
//     divider: {
//         height: theme.spacing(2),
//     },
// }));

// function NoOptionsMessage(props) {
//     return (
//         <Typography
//             color="textSecondary"
//             className={props.selectProps.classes.noOptionsMessage}
//             {...props.innerProps}
//         >
//             {props.children}
//         </Typography>
//     );
// }

// NoOptionsMessage.propTypes = {
//     /**
//      * The children to be rendered.
//      */
//     children: PropTypes.node,
//     /**
//      * Props to be passed on to the wrapper.
//      */
//     innerProps: PropTypes.object.isRequired,
//     selectProps: PropTypes.object.isRequired,
// };

// function inputComponent({ inputRef, ...props }) {
//     return <div ref={inputRef} {...props} />;
// }

// inputComponent.propTypes = {
//     inputRef: PropTypes.oneOfType([
//         PropTypes.func,
//         PropTypes.shape({
//             current: PropTypes.any.isRequired,
//         }),
//     ]),
// };

// function Control(props) {
//     const {
//         children,
//         innerProps,
//         innerRef,
//         selectProps: { classes, TextFieldProps },
//     } = props;

//     return (
//         <TextField
//             fullWidth
//             InputProps={{
//                 inputComponent,
//                 inputProps: {
//                     className: classes.input,
//                     ref: innerRef,
//                     children,
//                     ...innerProps,
//                 },
//             }}
//             {...TextFieldProps}
//         />
//     );
// }

// Control.propTypes = {
//     /**
//      * Children to render.
//      */
//     children: PropTypes.node,
//     /**
//      * The mouse down event and the innerRef to pass down to the controller element.
//      */
//     innerProps: PropTypes.shape({
//         onMouseDown: PropTypes.func.isRequired,
//     }).isRequired,
//     innerRef: PropTypes.oneOfType([
//         PropTypes.oneOf([null]),
//         PropTypes.func,
//         PropTypes.shape({
//             current: PropTypes.any.isRequired,
//         }),
//     ]).isRequired,
//     selectProps: PropTypes.object.isRequired,
// };

// function Option(props) {
//     return (
//         <MenuItem
//             ref={props.innerRef}
//             selected={props.isFocused}
//             component="div"
//             style={{
//                 fontWeight: props.isSelected ? 500 : 400,
//             }}
//             {...props.innerProps}
//         >
//             {props.children}
//         </MenuItem>
//     );
// }

// Option.propTypes = {
//     /**
//      * The children to be rendered.
//      */
//     children: PropTypes.node,
//     /**
//      * props passed to the wrapping element for the group.
//      */
//     innerProps: PropTypes.shape({
//         id: PropTypes.string.isRequired,
//         key: PropTypes.string.isRequired,
//         onClick: PropTypes.func.isRequired,
//         onMouseMove: PropTypes.func.isRequired,
//         onMouseOver: PropTypes.func.isRequired,
//         tabIndex: PropTypes.number.isRequired,
//     }).isRequired,
//     /**
//      * Inner ref to DOM Node
//      */
//     innerRef: PropTypes.oneOfType([
//         PropTypes.oneOf([null]),
//         PropTypes.func,
//         PropTypes.shape({
//             current: PropTypes.any.isRequired,
//         }),
//     ]).isRequired,
//     /**
//      * Whether the option is focused.
//      */
//     isFocused: PropTypes.bool.isRequired,
//     /**
//      * Whether the option is selected.
//      */
//     isSelected: PropTypes.bool.isRequired,
// };

// function Placeholder(props) {
//     const { selectProps, innerProps = {}, children } = props;
//     return (
//         <Typography color="textSecondary" className={selectProps.classes.placeholder} {...innerProps}>
//             {children}
//         </Typography>
//     );
// }

// Placeholder.propTypes = {
//     /**
//      * The children to be rendered.
//      */
//     children: PropTypes.node,
//     /**
//      * props passed to the wrapping element for the group.
//      */
//     innerProps: PropTypes.object,
//     selectProps: PropTypes.object.isRequired,
// };

// function SingleValue(props) {
//     return (
//         <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
//             {props.children}
//         </Typography>
//     );
// }

// SingleValue.propTypes = {
//     /**
//      * The children to be rendered.
//      */
//     children: PropTypes.node,
//     /**
//      * Props passed to the wrapping element for the group.
//      */
//     innerProps: PropTypes.any.isRequired,
//     selectProps: PropTypes.object.isRequired,
// };

// function ValueContainer(props) {
//     return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
// }

// ValueContainer.propTypes = {
//     /**
//      * The children to be rendered.
//      */
//     children: PropTypes.node,
//     selectProps: PropTypes.object.isRequired,
// };

// function Menu(props) {
//     return (
//         <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
//             {props.children}
//         </Paper>
//     );
// }

// Menu.propTypes = {
//     /**
//      * The children to be rendered.
//      */
//     children: PropTypes.element.isRequired,
//     /**
//      * Props to be passed to the menu wrapper.
//      */
//     innerProps: PropTypes.object.isRequired,
//     selectProps: PropTypes.object.isRequired,
// };

// const components = {
//     Control,
//     Menu,
//     NoOptionsMessage,
//     Option,
//     Placeholder,
//     SingleValue,
//     ValueContainer,
// };



// // class AddressAutocomplete extends React.Component {
// //     static propTypes = {
// //         value: PropTypes.string,
// //         floatingLabelText: PropTypes.string,
// //         hintText: PropTypes.string,
// //         onChange: PropTypes.func
// //     }

// //     componentWillMount () {
// //         this.setState({ value: this.props.value || '' })
// //     }

// //     componentDidMount () {
// //         const input = document.getElementById('addressAutocompleteField')
// //         const options = {
// //             componentRestrictions: {country: 'us'},
// //             types: ['(cities)']
// //         }
// //         const geoAutocomplete = new window.google.maps.places.Autocomplete((input), options)
// //         geoAutocomplete.addListener('place_changed', () => {
// //             const selectedPlace = geoAutocomplete.getPlace()
// //             const componentForm = {
// //                 street_number: 'short_name',
// //                 route: 'long_name',
// //                 locality: 'long_name',
// //                 administrative_area_level_1: 'short_name',
// //                 country: 'long_name',
// //                 postal_code: 'short_name'
// //             }
// //             // Get each component of the address from the place details
// //             // and fill the corresponding field on the form.
// //             let selectedSuggest = {}
// //             for (let addressComponent of selectedPlace.address_components) {
// //                 const addressType = addressComponent.types[0]
// //                 if (componentForm[addressType]) {
// //                     selectedSuggest[addressType] = addressComponent[componentForm[addressType]]
// //                 }
// //             } // input.value = selectedPlace.name // Code injection risk (check doc)
// //             input.value = `${selectedSuggest.locality}, ${selectedSuggest.administrative_area_level_1}, ${selectedSuggest.country}`;
// //             //this.props.onChange(selectedSuggest)
// //             console.log(selectedSuggest);
// //             this.props.history.push(`/search/:${selectedSuggest.locality}`);
// //         })
// //     }

// //     _handleChange = (event, value) => this.setState({ value })

// //     render () {
// //         return (
// //             <TextField
// //                 id='addressAutocompleteField'
// //                 floatingLabelText={this.props.floatingLabelText}
// //                 hintText={this.props.hintText}
// //                 value={this.state.value}
// //                 onChange={this._handleChange}
// //                 placeholder=''
// //                 fullWidth
// //             />
// //         )
// //     }
// // }

// //export default withRouter(AddressAutocomplete);
// const AutoComplete = () => {
//     const classes = useStyles();
//     const theme = useTheme();
//     const [single, setSingle] = React.useState(null);

//     function handleChangeSingle(value) {
//         setSingle(value);
//     }

//     const selectStyles = {
//         input: base => ({
//             ...base,
//             color: theme.palette.text.primary,
//             '& input': {
//                 font: 'inherit',
//             },
//         }),
//     };

//     return (
//         <div className={classes.root}>
//             <NoSsr>
//                 <Select
//                     classes={classes}
//                     styles={selectStyles}
//                     inputId="react-select-single"
//                     TextFieldProps={{
//                         label: 'Country',
//                         InputLabelProps: {
//                             htmlFor: 'react-select-single',
//                             shrink: true,
//                         },
//                     }}
//                     placeholder="Search a country"
//                     options={suggestions}
//                     components={components}
//                     value={single}
//                     onChange={handleChangeSingle}
//                 />
//             </NoSsr>
//         </div>
//     );
// }

// export default AutoComplete;
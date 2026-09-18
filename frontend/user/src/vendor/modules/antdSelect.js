"use strict";

const React = require("./reactRuntime.js");
const PropTypes = require("./propTypesRuntime.js");
const RcSelect = require("./RcSelect.js").default;
const SelectOption = require("./SelectOption.js").default;
const SelectOptGroup = require("./SelectOptGroup.js").default;
const classNames = require("./classNames.js");
const omitProps = require("./omitProps.js").a;
const ConfigConsumer = require("./ConfigContext.js").ConfigConsumer;
const warning = require("./antdWarning.js").a;
const Icon = require("../Icon.js").a;
const tuple = require("./tuple.js").a;

const selectSizes = tuple("default", "large", "small");

const selectPropTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.oneOf(selectSizes),
  notFoundContent: PropTypes.any,
  showSearch: PropTypes.bool,
  optionLabelProp: PropTypes.string,
  transitionName: PropTypes.string,
  choiceTransitionName: PropTypes.string,
  id: PropTypes.string
};

class Select extends React.Component {
  constructor(props) {
    super(props);

    this.saveSelect = node => {
      this.rcSelect = node;
    };

    this.renderSelect = config => {
      const {
        getPopupContainer: getContextPopupContainer,
        getPrefixCls,
        renderEmpty
      } = config;
      const {
        prefixCls: customPrefixCls,
        className = "",
        size,
        mode,
        getPopupContainer,
        removeIcon,
        clearIcon,
        menuItemSelectedIcon,
        showArrow,
        ...restProps
      } = this.props;
      const rest = omitProps(restProps, ["inputIcon"]);
      const prefixCls = getPrefixCls("select", customPrefixCls);
      const selectClassName = classNames({
        [`${prefixCls}-lg`]: size === "large",
        [`${prefixCls}-sm`]: size === "small",
        [`${prefixCls}-show-arrow`]: showArrow
      }, className);
      const optionLabelProp = this.isCombobox()
        ? this.props.optionLabelProp || "value"
        : this.props.optionLabelProp;
      const modeConfig = {
        multiple: mode === "multiple",
        tags: mode === "tags",
        combobox: this.isCombobox()
      };
      const finalRemoveIcon = removeIcon && (
        React.isValidElement(removeIcon)
          ? React.cloneElement(removeIcon, {
            className: classNames(removeIcon.props.className, `${prefixCls}-remove-icon`)
          })
          : removeIcon
      ) || React.createElement(Icon, {
        type: "close",
        className: `${prefixCls}-remove-icon`
      });
      const finalClearIcon = clearIcon && (
        React.isValidElement(clearIcon)
          ? React.cloneElement(clearIcon, {
            className: classNames(clearIcon.props.className, `${prefixCls}-clear-icon`)
          })
          : clearIcon
      ) || React.createElement(Icon, {
        type: "close-circle",
        theme: "filled",
        className: `${prefixCls}-clear-icon`
      });
      const finalMenuItemSelectedIcon = menuItemSelectedIcon && (
        React.isValidElement(menuItemSelectedIcon)
          ? React.cloneElement(menuItemSelectedIcon, {
            className: classNames(menuItemSelectedIcon.props.className, `${prefixCls}-selected-icon`)
          })
          : menuItemSelectedIcon
      ) || React.createElement(Icon, {
        type: "check",
        className: `${prefixCls}-selected-icon`
      });

      return React.createElement(RcSelect, Object.assign({
        inputIcon: this.renderSuffixIcon(prefixCls),
        removeIcon: finalRemoveIcon,
        clearIcon: finalClearIcon,
        menuItemSelectedIcon: finalMenuItemSelectedIcon,
        showArrow
      }, rest, modeConfig, {
        prefixCls,
        className: selectClassName,
        optionLabelProp: optionLabelProp || "children",
        notFoundContent: this.getNotFoundContent(renderEmpty),
        getPopupContainer: getPopupContainer || getContextPopupContainer,
        ref: this.saveSelect
      }));
    };

    warning(
      props.mode !== "combobox",
      "Select",
      "The combobox mode is deprecated, it will be removed in next major version, please use AutoComplete instead"
    );
  }

  getNotFoundContent(renderEmpty) {
    if (this.props.notFoundContent !== undefined) {
      return this.props.notFoundContent;
    }
    return this.isCombobox() ? null : renderEmpty("Select");
  }

  focus() {
    this.rcSelect.focus();
  }

  blur() {
    this.rcSelect.blur();
  }

  isCombobox() {
    const { mode } = this.props;
    return mode === "combobox" || mode === Select.SECRET_COMBOBOX_MODE_DO_NOT_USE;
  }

  renderSuffixIcon(prefixCls) {
    const { loading, suffixIcon } = this.props;
    if (suffixIcon) {
      return React.isValidElement(suffixIcon)
        ? React.cloneElement(suffixIcon, {
          className: classNames(suffixIcon.props.className, `${prefixCls}-arrow-icon`)
        })
        : suffixIcon;
    }
    if (loading) {
      return React.createElement(Icon, { type: "loading" });
    }
    return React.createElement(Icon, {
      type: "down",
      className: `${prefixCls}-arrow-icon`
    });
  }

  render() {
    return React.createElement(ConfigConsumer, null, this.renderSelect);
  }
}

Select.Option = SelectOption;
Select.OptGroup = SelectOptGroup;
Select.SECRET_COMBOBOX_MODE_DO_NOT_USE = "SECRET_COMBOBOX_MODE_DO_NOT_USE";
Select.defaultProps = {
  showSearch: false,
  transitionName: "slide-up",
  choiceTransitionName: "zoom"
};
Select.propTypes = selectPropTypes;

exports.__esModule = true;
exports.default = Select;
exports.a = Select;

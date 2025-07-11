///
/// HybridCurrencyPickerViewSpec.hpp
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2025 Marc Rousavy @ Margelo
///

#pragma once

#if __has_include(<NitroModules/HybridObject.hpp>)
#include <NitroModules/HybridObject.hpp>
#else
#error NitroModules cannot be found! Are you sure you installed NitroModules properly?
#endif





namespace margelo::nitro::onchain {

  using namespace margelo::nitro;

  /**
   * An abstract base class for `CurrencyPickerView`
   * Inherit this class to create instances of `HybridCurrencyPickerViewSpec` in C++.
   * You must explicitly call `HybridObject`'s constructor yourself, because it is virtual.
   * @example
   * ```cpp
   * class HybridCurrencyPickerView: public HybridCurrencyPickerViewSpec {
   * public:
   *   HybridCurrencyPickerView(...): HybridObject(TAG) { ... }
   *   // ...
   * };
   * ```
   */
  class HybridCurrencyPickerViewSpec: public virtual HybridObject {
    public:
      // Constructor
      explicit HybridCurrencyPickerViewSpec(): HybridObject(TAG) { }

      // Destructor
      ~HybridCurrencyPickerViewSpec() override = default;

    public:
      // Properties
      virtual bool getEnableFlash() = 0;
      virtual void setEnableFlash(bool enableFlash) = 0;

    public:
      // Methods
      

    protected:
      // Hybrid Setup
      void loadHybridMethods() override;

    protected:
      // Tag for logging
      static constexpr auto TAG = "CurrencyPickerView";
  };

} // namespace margelo::nitro::onchain

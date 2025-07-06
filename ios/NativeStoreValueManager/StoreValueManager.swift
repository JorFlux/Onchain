//
//  StoreValueManager.swift
//  Onchain
//
//  Created by Jordan on 6/7/2025.
//

import Foundation

@objc public class StoreValueManager: NSObject {
  
  @objc public func getSelectedCurrency() -> String? {
    return CurrencyManager.shared.selectedCurrency
  }
  
}

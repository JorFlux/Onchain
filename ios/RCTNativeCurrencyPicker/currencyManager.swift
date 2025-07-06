//
//  currencyManager.swift
//  CurrencyPicker
//
//  Created by Jordan on 6/7/2025.
//

import Foundation
import Combine
class CurrencyManager: ObservableObject {
  static let shared = CurrencyManager()
  
  @Published var selectedCurrency: String
  
  private init() {
    self.selectedCurrency = UserDefaults.standard.string(forKey: "selectedCurrency") ?? "USD"
    $selectedCurrency
      .dropFirst() // 跳過初始值的發送
      .sink { newValue in
        UserDefaults.standard.set(newValue, forKey: "selectedCurrency")
        NotificationCenter.default.post(
          name: NSNotification.Name("onSelectedCurrencyChanged"),
          object: nil,
          userInfo: ["selectedCurrency": newValue]
        )
      }
      .store(in: &cancellables)
  }
  
  private var cancellables = Set<AnyCancellable>()
}

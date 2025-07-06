  //
  //  ContentView.swift
  //  CurrencyPicker
  //
  //  Created by Jordan on 6/7/2025.
  //

import SwiftUI

struct CurrencyPicker: View {
  @ObservedObject private var currencyManager = CurrencyManager.shared
  
  let currencyOptions = ["USD", "HKD"]
  var body: some View {
    VStack{
      List {
        Text("Select your preferred display currency. Your display currency is used to provide a fiat equivalence for your crypto balances")
          .font(.body)
        ForEach(currencyOptions, id: \.self) { currency in
          HStack {
            Image(systemName: "dollarsign.circle.fill")
              .foregroundColor(currencyManager.selectedCurrency == currency ? .blue : .gray)
            Text(currency)
            Spacer()
            if currency == currencyManager.selectedCurrency {
              Image(systemName: "checkmark")
                .foregroundColor(.green)
            }
          }
          .onTapGesture {
            currencyManager.selectedCurrency = currency
          }
        }.listRowSeparator(.hidden)
      }.listStyle(.plain)
      
      
    }
    .padding(.horizontal)
    .background(Color.white)
    .navigationTitle("Select Currency")
    .navigationBarTitleDisplayMode(.inline)
  }
}

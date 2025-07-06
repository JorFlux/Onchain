//
//  SwiftUIProvider.swift
//  Onchain
//
//  Created by Jordan on 6/7/2025.
//

import UIKit
import React
import SwiftUI


@objc public class CurrencyPickerProvider: UIView {
  private var hostingController: UIHostingController<CurrencyPicker>?
  
  public override func layoutSubviews() {
    super.layoutSubviews()
    setupView()
  }
  
  private func setupView() {
    guard hostingController == nil else { return }
    
    let swiftUIView = CurrencyPicker()
    let hostingController = UIHostingController(rootView: swiftUIView)
    hostingController.view.translatesAutoresizingMaskIntoConstraints = false
    
    self.addSubview(hostingController.view)
    
    NSLayoutConstraint.activate([
      hostingController.view.topAnchor.constraint(equalTo: self.topAnchor),
      hostingController.view.bottomAnchor.constraint(equalTo: self.bottomAnchor),
      hostingController.view.leadingAnchor.constraint(equalTo: self.leadingAnchor),
      hostingController.view.trailingAnchor.constraint(equalTo: self.trailingAnchor)
    ])
    
    self.hostingController = hostingController
  }
}

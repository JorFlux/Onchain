//
//  RCTNativeCurrencyPicker.m
//  Onchain
//
//  Created by Jordan on 6/7/2025.
//
#import "RCTDefaultReactNativeFactoryDelegate.h"
#import "RCTCurrencyPickerView.h"
#import "Onchain-Swift.h"
#import <SwiftUI/SwiftUI.h>
#import <react/renderer/components/appspec/ComponentDescriptors.h>
#import <react/renderer/components/appspec/RCTComponentViewHelpers.h>
#import <React/RCTConversions.h>
#import <React/RCTUtils.h>
@interface RCTCurrencyPickerView()<RCTCurrencyPickerViewViewProtocol>
@end
@implementation RCTCurrencyPickerView{
  CurrencyPickerProvider *_providerView;
}
- (instancetype)init
{
  self = [super init];
  if (self) {
    _providerView = [CurrencyPickerProvider new];
    self.contentView = _providerView;
  }
  return self;
}

-(void)layoutSubviews
{
  [super layoutSubviews];
  
}

+ (facebook::react::ComponentDescriptorProvider)componentDescriptorProvider {
  return facebook::react::concreteComponentDescriptorProvider<facebook::react::CurrencyPickerViewComponentDescriptor>();
}


@end

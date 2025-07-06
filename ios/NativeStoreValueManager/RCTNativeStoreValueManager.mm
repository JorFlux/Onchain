//
//  RCTNativeStoreValueManager.m
//  Onchain
//
//  Created by Jordan on 6/7/2025.
//
#import "RCTDefaultReactNativeFactoryDelegate.h"
#import "RCTNativeStoreValueManager.h"
#import "Onchain-Swift.h"
@implementation RCTNativeStoreValueManager{
  StoreValueManager *valueManager;
}

- (instancetype)init {
  self = [super init];
  if (self) {
    valueManager = [[StoreValueManager alloc] init];
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(selectedCurrencyChanged:)
                                                 name:@"onSelectedCurrencyChanged"
                                               object:nil];
  }
  return self;
}
+ (NSString *)moduleName {
  return @"NativeStoreValueManager";
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params { 
  return std::make_shared<facebook::react::NativeStoreValueManagerSpecJSI>(params);
}

- (void)selectedCurrencyChanged:(NSNotification *)notification {
  NSDictionary *userInfo = notification.userInfo;
  NSString *selectedCurrency = userInfo[@"selectedCurrency"];
  
  if (selectedCurrency) {
    [self emitOnSelectedCurrencyChanged:@{@"key": @"selectedCurrency", @"value": selectedCurrency}];
  } else {
    NSLog(@"No value");
  }
}


- (NSString * _Nullable)getSelectedCurrencyValue { 
  return [valueManager getSelectedCurrency];
}

@end

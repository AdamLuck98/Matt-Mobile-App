
#import <Foundation/Foundation.h>

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
@interface RCT_EXTERN_MODULE(CustomMethods, NSObject)
  RCT_EXTERN_METHOD(simpleMethod)
  RCT_EXTERN_METHOD(simpleMethodReturns:
    (RCTResponseSenderBlock) callback
  )
  RCT_EXTERN_METHOD(simpleMethodWithParams:
    (NSString *) param
    callback: (RCTResponseSenderBlock)callback
  )
  RCT_EXTERN_METHOD(
    resolvePromise: (RCTPromiseResolveBlock) resolve
    rejecter: (RCTPromiseRejectBlock) reject
  )
  RCT_EXTERN_METHOD(rejectPromise:
    (RCTPromiseResolveBlock) resolve
    rejecter: (RCTPromiseRejectBlock) reject
  )
RCT_EXTERN_METHOD( bothClassifyAndCallback: (NSString*)img resolver: (RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(bothClassifyAndCallbackWithStockNumber:(NSString *)stockNumber
                                                price:(NSString *)price
                                       title:(NSString *)title
                                       draftsize:(NSString *)draftsize
                                              resolver:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(barcodeParam: (NSString *)stockNumber price: (NSString *)price title: (NSString *)title draftsize: (NSString *)draftsize resolver: (RCTPromiseResolveBlock)resolve rejecter: (RCTPromiseRejectBlock)reject)



@end

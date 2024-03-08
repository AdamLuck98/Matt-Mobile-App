
import Foundation


@objc(CustomMethods) class CustomMethods: NSObject {
  @objc static func requiresMainQueueSetup() -> Bool { return true }
  @objc public func simpleMethod() {
    
    
  }
  
  @objc(:stockNumber:price:title:draftsize:)
  func bothClassifyAndCallback(_ stockNumber: String, _ price: String, _ title: String, _ draftsize: String, resolver callback: RCTResponseSenderBlock) {
    print("St -- \(stockNumber)")
    print("St -- \(price)")
    print("St -- \(title)")
    print("St -- \(draftsize)")
      return callback(["receiving and returning to js"])
  }
  
  @objc func barcodeParam(_ stockNumber: String, price: String, title: String, draftsize: String, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
    print("St -- \(stockNumber)")
    print("St -- \(price)")
    print("St -- \(title)")
    print("St -- \(draftsize)")
    
    DispatchQueue.main.async {
      
      if UIPrintInteractionController.isPrintingAvailable {
        
        let a4Size = CGSize(width: 595.2, height: 841.8)
                let a4View = UIView(frame: CGRect(origin: .zero, size: a4Size))
                a4View.backgroundColor = .white
        
        let roundedView = UIView()
        
        roundedView.layer.cornerRadius = 25.0
        roundedView.layer.masksToBounds = true
        roundedView.layer.borderWidth = 2.0 // Set the width of the border
        roundedView.layer.borderColor = UIColor.black.cgColor
        roundedView.frame = CGRect(x: 50, y: 50, width: 300, height: 150)
        
        let topLable = UILabel()
        topLable.text = "\(draftsize)"
        topLable.textColor = .black
        topLable.textAlignment = .center
        topLable.font = UIFont(name: "Helvetica-Bold", size: 22.0)
        topLable.translatesAutoresizingMaskIntoConstraints = false
        
        let middleLable = UILabel()
        middleLable.text = "\(title)"
        middleLable.textColor = .black
        middleLable.textAlignment = .center
        middleLable.font = UIFont(name: "Helvetica-Bold", size: 16.0)
        middleLable.translatesAutoresizingMaskIntoConstraints = false
        
        let bottomLeftLable = UILabel()
        bottomLeftLable.text = "$\(price)"
        bottomLeftLable.textColor = .black
        bottomLeftLable.textAlignment = .center
        bottomLeftLable.font = UIFont(name: "Helvetica-Bold", size: 16.0)
        bottomLeftLable.translatesAutoresizingMaskIntoConstraints = false
        
        let bottomRightLable = UILabel()
        bottomRightLable.text = stockNumber
        bottomRightLable.textColor = .black
        bottomRightLable.textAlignment = .center
        bottomRightLable.font = UIFont(name: "Helvetica-Bold", size: 16.0)
        bottomRightLable.translatesAutoresizingMaskIntoConstraints = false
        
        let catImage = UIImage(barcode: "\(stockNumber)")
        let myImageView = UIImageView(image: catImage)
        myImageView.translatesAutoresizingMaskIntoConstraints = false
        
        roundedView.addSubview(topLable)
        roundedView.addSubview(middleLable)
        roundedView.addSubview(bottomLeftLable)
        roundedView.addSubview(bottomRightLable)
        roundedView.addSubview(myImageView)
        
        topLable.topAnchor.constraint(equalTo: roundedView.topAnchor, constant: 10).isActive = true
        topLable.leadingAnchor.constraint(equalTo: roundedView.leadingAnchor).isActive = true
        topLable.trailingAnchor.constraint(equalTo: roundedView.trailingAnchor).isActive = true
        

        // Define constraints for middleLabel
        middleLable.topAnchor.constraint(equalTo: topLable.bottomAnchor, constant: 7).isActive = true
        middleLable.leadingAnchor.constraint(equalTo: roundedView.leadingAnchor).isActive = true
        middleLable.trailingAnchor.constraint(equalTo: roundedView.trailingAnchor).isActive = true
        
        
        bottomLeftLable.topAnchor.constraint(equalTo: middleLable.bottomAnchor, constant: 7).isActive = true
        bottomLeftLable.leadingAnchor.constraint(equalTo: roundedView.leadingAnchor, constant: 25).isActive = true
        
        
        
        bottomRightLable.topAnchor.constraint(equalTo: middleLable.bottomAnchor, constant: 7).isActive = true
        bottomRightLable.trailingAnchor.constraint(equalTo: roundedView.trailingAnchor, constant: -25).isActive = true
        
        
        myImageView.bottomAnchor.constraint(equalTo: roundedView.bottomAnchor, constant: 0).isActive = true
        myImageView.trailingAnchor.constraint(equalTo: roundedView.trailingAnchor, constant: -10).isActive = true
        myImageView.leadingAnchor.constraint(equalTo: roundedView.leadingAnchor, constant: 10).isActive = true
        myImageView.heightAnchor.constraint(equalToConstant: 65).isActive = true
        
        let printController = UIPrintInteractionController.shared
        let printInfo = UIPrintInfo(dictionary: nil)
        printInfo.outputType = .general
        printInfo.jobName = "MyViewPrintJob" // Set a job name
        printController.printInfo = printInfo
        
        // Create a UIViewPrintFormatter for your view
        
        
        printController.printingItem = roundedView.toImage()
        
        // Present the print controller to the user
        printController.present(animated: true, completionHandler: nil)
      } else {
        // AirPrint is not available on this device, handle the error
        print("AirPrint is not available on this device.")
      }
    }
    
  }
  
  @objc public func simpleMethodReturns(
    _ callback: RCTResponseSenderBlock
  ) {
    callback(["CustomMethods.simpleMethodReturns()"])
  }
  @objc public func simpleMethodWithParams(
    _ param: String,
    callback: RCTResponseSenderBlock
    
  ) {
    callback(["CustomMethods.simpleMethodWithParams('\(param)')"])
  }
  @objc public func throwError() throws {
    
  }
  @objc public func resolvePromise(
    _ resolve: RCTPromiseResolveBlock,
    rejecter reject: RCTPromiseRejectBlock
  ) -> Void {
    resolve("CustomMethods.resolvePromise()")
  }
  @objc public func rejectPromise(
    _ resolve: RCTPromiseResolveBlock,
    rejecter reject: RCTPromiseRejectBlock
  ) -> Void {
    reject("0", "CustomMethods.rejectPromise()", nil)
  }
}

extension UIView {
  func toImage() -> UIImage {
    UIGraphicsBeginImageContextWithOptions(bounds.size, false, UIScreen.main.scale)
    
    drawHierarchy(in: self.bounds, afterScreenUpdates: true)
    
    let image = UIGraphicsGetImageFromCurrentImageContext()!
    UIGraphicsEndImageContext()
    return image
  }
}

extension UIImage {
  
  convenience init?(barcode: String) {
    let data = barcode.data(using: .ascii)
    guard let filter = CIFilter(name: "CICode128BarcodeGenerator") else {
      return nil
    }
    filter.setValue(data, forKey: "inputMessage")
    guard let ciImage = filter.outputImage else {
      return nil
    }
    self.init(ciImage: ciImage)
  }
  
}

import HashMap "mo:base/HashMap";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Nat64 "mo:base/Nat64";
import Nat "mo:base/Nat";

actor WillManager {
  // -- Data Types Definitions --

  /// A beneficiary’s details.
  public type Beneficiary = {
    firstName : Text;
    lastName : Text;
    relationship : Text;
    email : Text;
    phone : Text;
    wallet : Principal;
  };

  /// An asset’s details. The documentation field is intended to hold a link (e.g. an IPFS hash) pointing to off-chain documentation.
  public type Asset = {
    assetName : Text;
    assetType : Text;
    estimatedValue : Nat64;
    description : Text;
    documentation : Text;
  };

  /// A will record. Each will is associated with an owner (the account creating it), a list of beneficiary addresses,
  /// additional beneficiary details, assets to be transferred, an execution time (e.g. a Unix timestamp in seconds),
  /// and a flag indicating whether the will has been executed.
  public type Will = {
    willName : Text;
    willDescription : Text;
    owner : Principal;
    beneficiaryAddresses : [Principal];
    beneficiaries : [Beneficiary];
    assets : [Asset];
    executeTime : Nat64;
    executed : Bool;
  };

  // -- Storage --
  // A HashMap mapping each owner's Principal to their Will.
  var willsMap : HashMap.HashMap<Principal, Will> = HashMap.HashMap<Principal, Will>(10, Principal.equal, Principal.hash);

  // -- Functions --

  /**
   * Creates a will record.
   *
   * @param willName          The name/title of the will.
   * @param willDescription   A description of the will.
   * @param beneficiaryAddresses   A list of beneficiary wallet addresses.
   * @param executeTime       A Unix timestamp (in Nat64) after which the will may be executed.
   *
   * @return true if creation is successful, or false if a will already exists for the caller.
   */
  public shared (msg) func createWill(
    willName : Text,
    willDescription : Text,
    beneficiaryAddresses : [Principal],
    executeTime : Nat64,
  ) : async Bool {
    let owner = msg.caller;
    let newWill : Will = {
      willName = willName;
      willDescription = willDescription;
      owner = owner;
      beneficiaryAddresses = beneficiaryAddresses;
      beneficiaries = []; // No beneficiary details added yet.
      assets = [];
      executeTime = executeTime;
      executed = false;
    };
    let _ = willsMap.put(owner, newWill);
    return true;
  };

  /**
   * Adds a beneficiary’s details to the caller’s will.
   *
   * @param firstName    Beneficiary’s first name.
   * @param lastName     Beneficiary’s last name.
   * @param relationship Relationship with the owner.
   * @param email        Email address.
   * @param phone        Phone number.
   * @param wallet       Wallet address (Principal).
   *
   * @return true if the beneficiary is added; false if no will exists.
   */
  public shared (msg) func addBeneficiary(
    firstName : Text,
    lastName : Text,
    relationship : Text,
    email : Text,
    phone : Text,
    wallet : Principal,
  ) : async Bool {
    let owner = msg.caller;
    switch (willsMap.get(owner)) {
      case (?will) {
        let beneficiary : Beneficiary = {
          firstName = firstName;
          lastName = lastName;
          relationship = relationship;
          email = email;
          phone = phone;
          wallet = wallet;
        };
        // If the wallet isn’t already in the beneficiaryAddresses list, add it.
        let alreadyExists : ?Principal = Array.find<Principal>(
          will.beneficiaryAddresses,
          func(p : Principal) : Bool { p == wallet },
        );
        let exists = alreadyExists != null;
        let newBeneficiaryAddresses = if (exists) {
          will.beneficiaryAddresses;
        } else {
          Array.append(will.beneficiaryAddresses, [wallet]);
        };
        let newBeneficiaries = Array.append(will.beneficiaries, [beneficiary]);
        let updatedWill = {
          will with
          beneficiaryAddresses = newBeneficiaryAddresses;
          beneficiaries = newBeneficiaries;
        };
        let _ = willsMap.put(owner, updatedWill);
        return true;
      };
      case null {
        return false;
      };
    };
  };

  /**
   * Adds an asset to the caller’s will.
   *
   * @param assetName       The name of the asset.
   * @param assetType       The type/category of the asset.
   * @param estimatedValue  The estimated value (using Nat64).
   * @param description     A description of the asset.
   * @param documentation   A reference (e.g. IPFS link) to asset documentation.
   *
   * @return true if the asset is added; false if no will exists.
   */
  public shared (msg) func addAsset(
    assetName : Text,
    assetType : Text,
    estimatedValue : Nat64,
    description : Text,
    documentation : Text,
  ) : async Bool {
    let owner = msg.caller;
    switch (willsMap.get(owner)) {
      case (?will) {
        let asset : Asset = {
          assetName = assetName;
          assetType = assetType;
          estimatedValue = estimatedValue;
          description = description;
          documentation = documentation;
        };
        let newAssets = Array.append(will.assets, [asset]);
        let updatedWill = { will with assets = newAssets };
        let _ = willsMap.put(owner, updatedWill);
        return true;
      };
      case null {
        return false;
      };
    };
  };

  /**
   * Simulates the transfer of assets. In a real-world application, this function would integrate
   * with NFT transfer logic and possibly call external canisters.
   *
   * @param will  The will to execute.
   *
   * @return true on successful (simulated) transfer.
   */
  private func transferAssets(will : Will) : async Bool {
    // --- Place NFT transfer logic here ---
    // For demonstration, we assume a successful transfer.
    return true;
  };

  /**
   * Submits the will for execution. It checks that the current time is past the scheduled
   * executeTime and, if so, triggers the asset transfer.
   *
   * @return true if the will was executed; false if it’s too early or if no will exists.
   */
  public shared (msg) func submitWill() : async Bool {
    let owner = msg.caller;
    switch (willsMap.get(owner)) {
      case (?will) {
        if (will.executed) {
          // The will has already been executed.
          return false;
        };
        let currentTime : Int = Time.now();
        let currentTimeNat64 = Nat64.fromIntWrap(currentTime);
        if (currentTimeNat64 >= will.executeTime) {
          // Time condition met: trigger asset transfer.
          let transferResult = await transferAssets(will);
          if (transferResult) {
            let updatedWill = { will with executed = true };
            let _ = willsMap.put(owner, updatedWill);
            return true;
          } else {
            return false;
          };
        } else {
          // It's not yet time to execute the will or time retrieval failed.
          return false;
        };
      };
      case null {
        return false;
      };
    };
  };

  /// A helper function to fetch the caller’s will.
  public shared (msg) func getWill() : async ?Will {
    let caller = msg.caller;
    return willsMap.get(caller);
  };
};

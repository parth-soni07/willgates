use calimero_sdk::borsh::{BorshDeserialize, BorshSerialize};
use calimero_sdk::types::Error;
use calimero_sdk::{app, env};
use std::collections::BTreeMap;
use calimero_storage::collections::UnorderedMap;

#[app::state]
#[derive(Default, BorshSerialize, BorshDeserialize)]
#[borsh(crate = "calimero_sdk::borsh")]
struct KvStore {
    entries: UnorderedMap<String, String>,
}

#[app::logic]
impl KvStore {
    #[app::init]
    pub fn init() -> KvStore {
        KvStore {
            items: UnorderedMap::new(),
        }
    }

    pub fn set(&mut self, key: String, value: String) -> Result<(), Error> {
        env::log(&format!("Setting key: {:?} to value: {:?}", key, value));

        self.entries.insert(key, value)?;

        Ok(())
    }

    pub fn entries(&self) -> Result<BTreeMap<String, String>, Error> {
        env::log("Getting all entries");

        Ok(self.items.entries()?.collect())
    }

    pub fn get(&self, key: &str) -> Result<Option<String>, Error> {
        env::log(&format!("Getting key: {:?}", key));

        self.items.get(key).map_err(Into::into)
    }

    pub fn remove(&mut self, key: &str) -> Result<Option<String>, Error> {
        env::log(&format!("Removing key: {:?}", key));

        self.items.remove(key).map_err(Into::into)
    }
}
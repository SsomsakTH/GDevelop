/*
 * GDevelop Core
 * Copyright 2008-2016 Florian Rival (Florian.Rival@gmail.com). All rights
 * reserved. This project is released under the MIT License.
 */

#if defined(GD_IDE_ONLY)
#ifndef GDCORE_RESOURCESRENAMER_H
#define GDCORE_RESOURCESRENAMER_H

#include <set>
#include <vector>

#include "GDCore/IDE/Project/ArbitraryResourceWorker.h"
#include "GDCore/String.h"

namespace gd {

/**
 * \brief Class used to rename resources (in an object, an entire project,
 * etc...)
 *
 * \ingroup IDE
 */
class ResourcesRenamer : public gd::ArbitraryResourceWorker {
 public:
  /**
   * @brief Constructor taking the map from old name to new name.
   * @param oldToNewNames_ A map associating to a resource name the new name to
   * use.
   */
  ResourcesRenamer(const std::map<gd::String, gd::String>& oldToNewNames_)
      : gd::ArbitraryResourceWorker(), oldToNewNames(oldToNewNames_){};
  virtual ~ResourcesRenamer(){};

  virtual void ExposeFile(gd::String& resourceFileName) override{
      // Don't do anything: we're renaming resources, not the files they are
      // pointing to.
  };
  virtual void ExposeImage(gd::String& imageResourceName) override {
    RenameIfNeeded(imageResourceName);
  };
  virtual void ExposeAudio(gd::String& audioResourceName) override {
    RenameIfNeeded(audioResourceName);
  };
  virtual void ExposeFont(gd::String& fontResourceName) override {
    RenameIfNeeded(fontResourceName);
  };
  virtual void ExposeJson(gd::String& jsonResourceName) override {
    RenameIfNeeded(jsonResourceName);
  };
  virtual void ExposeVideo(gd::String& videoResourceName) override {
    RenameIfNeeded(videoResourceName);
  };
  virtual void ExposeBitmapFont(gd::String& bitmapFontName) override {
    RenameIfNeeded(bitmapFontName);
  };

 private:
  void RenameIfNeeded(gd::String& resourceName) {
    if (oldToNewNames.find(resourceName) != oldToNewNames.end())
      resourceName = oldToNewNames[resourceName];
  }

  std::map<gd::String, gd::String> oldToNewNames;
};

}  // namespace gd

#endif  // GDCORE_RESOURCESRENAMER_H
#endif

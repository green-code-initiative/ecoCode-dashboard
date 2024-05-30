// Package

package fr.capgemini.greensight.plugin;

import fr.capgemini.greensight.plugin.rules.external.ExternalRulesImportSensor;
import fr.capgemini.greensight.plugin.quality_profiles.JavaQualityProfile;
import fr.capgemini.greensight.plugin.quality_profiles.PhpQualityProfile;
import fr.capgemini.greensight.plugin.quality_profiles.PythonQualityProfile;
import fr.capgemini.greensight.plugin.rules.definitions.JavaRulesDefinition;
import fr.capgemini.greensight.plugin.rules.definitions.PhpRulesDefinition;
import fr.capgemini.greensight.plugin.rules.definitions.PythonRulesDefinition;
import fr.capgemini.greensight.plugin.web.GreensightPageDefinition;
import org.sonar.api.Plugin;

/**
 * Main plugin class
 */
public class GreensightPlugin implements Plugin {
    @Override
    public void define(Context context) {
        context.addExtensions(JavaRulesDefinition.class, JavaQualityProfile.class);
        context.addExtensions(PhpRulesDefinition.class, PhpQualityProfile.class);
		context.addExtensions(PythonRulesDefinition.class, PythonQualityProfile.class);
        context.addExtension(GreensightPageDefinition.class);
        context.addExtension(ExternalRulesImportSensor.class);
    }
}
